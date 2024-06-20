import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import * as ffprobePath from 'ffprobe-static';
import { TelegramService } from 'src/telegram/telegram.service';
import { PrismaService } from 'prisma/PrismaService';
import { Console } from 'console';
const crypto = require('crypto');

// Set the path to the FFmpeg executable
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobePath.path)
@Injectable()
export class VideoMakerService {
    constructor(
        private readonly prismaService: PrismaService
    ) {

    }

    async registreVideoCreate(nome_arquivo, tempo_final, tempo_inicia, categoria) {
        try {
            const novoVideo = await this.prismaService.tabela_video_cortes.create({
                data: {
                    nome_arquivo: nome_arquivo, // Substitua pelos dados reais
                    tempo_inicia: tempo_inicia,
                    tempo_final: tempo_final,
                    deletado: false,
                    categoria: categoria
                }
            });
            console.log('Vídeo registrado:', novoVideo);
        } catch (error) {
            console.error('Erro ao registrar o vídeo:', error);
        } finally {
            await this.prismaService.$disconnect();
        }
    }

    async confirmeIfThisCutExist(tempo_inicia, tempo_final, nome_arquivo) {
        try {
            const rows = await this.prismaService.$executeRaw`
            SELECT * 
            FROM tabela_video_cortes 
            WHERE tempo_inicia > ${tempo_inicia} 
            AND tempo_final < ${tempo_final} 
            AND nome_arquivo = ${nome_arquivo}
            AND deletado = false`

            return rows

        } catch (e) {
            console.log(e)
        }
    }



    async createNewVdo(categoria) {
        const folderPath = '/home/maikon/Desktop/Projetos/nestjs-api-scrapper/src/video-maker/video'
        const musicFolder = '/home/maikon/Desktop/Projetos/nestjs-api-scrapper/src/video-maker/music'
        const outFolder = '/home/maikon/Desktop/Projetos/nestjs-api-scrapper/src/video-maker/output'

        // const music = fs.readdirSync(musicFolder)
        const files = fs.readdirSync(folderPath);


        if (files.length === 0) {
            throw new Error('No files found the specified Folder');
        }

        const randomVideoFile = path.join(folderPath, files[Math.floor(Math.random() * files.length)]);

        // const randomMusicFile = path.join(musicFolder, music[Math.floor(Math.random() * music.length)]);

        const outputVideoPath = path.join(outFolder, `output_${crypto.createHash('sha256').update('42').digest('hex')}.mp4`); // Customize the output path as needed

        console.log("output video path", outputVideoPath)

        return new Promise<string>((resolve, reject) => {
            ffmpeg.ffprobe(randomVideoFile, (err, metadata) => {
                if (err) {
                    console.error('Error getting video metadata:', err);
                } else {

                    const startTime = Math.floor(Math.random() * (metadata.format.duration - 300));


                    const maxDuration = 300; // 5 minutes in seconds
                    const endTime = startTime + Math.floor(Math.random() * maxDuration);

                    console.log('Random Start Time:', startTime);
                    console.log('Random End Time:', endTime);

                    this.confirmeIfThisCutExist(startTime, endTime, randomVideoFile)
                        .then(rows => {
                            console.log(rows)
                            if (rows > 0) {
                                reject()
                            }
                        })
                        .catch(e => {
                            console.log(e)
                            reject()
                        })

                    this.registreVideoCreate(randomVideoFile, startTime, endTime, categoria)
                        .then().catch(e => {
                            console.log(e)
                            reject()
                        })

                    const ffmpegCommand = ffmpeg()
                        .input(randomVideoFile)
                        .inputOptions([`-ss ${startTime}`, `-t ${endTime - startTime}`])  // Set start and duration
                        .outputOptions('-c:v libx264')  // Change codec if needed
                        .outputOptions('-c:a aac')      // Change audio codec if needed
                        .outputOptions('-strict -2')    // Allow experimental codecs
                        // Add random background music
                        .audioCodec('aac')              // Change audio codec for music if needed
                        .on('end', () => {
                            console.log('Video creation finished.');
                            resolve(outputVideoPath);
                        })
                        .on('error', (err) => {
                            console.error('Error:', err);
                            reject(err);
                        });

                    // Save the output video to the specified path

                    ffmpegCommand.save(outputVideoPath);
                }

            })
        });
    }

}

