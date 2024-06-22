import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import * as ffprobePath from 'ffprobe-static';
import { TelegramService } from 'src/telegram/telegram.service';
import { PrismaService } from 'prisma/PrismaService';
import { QueueService } from 'src/queue/queue.service';
const crypto = require('crypto');

// Set the path to the FFmpeg executable
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobePath.path)
@Injectable()
export class VideoMakerService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly queueService: QueueService
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
        const folderPath = '/home/maikon/Desktop/Projetos/video';
        const outFolder = '/home/maikon/Desktop/Projetos/output';

        const files = fs.readdirSync(folderPath);

        if (files.length === 0) {
            throw new Error('Nenhum arquivo encontrado na pasta especificada.');

        }

        const randomVideoFile = path.join(folderPath, files[Math.floor(Math.random() * files.length)]);
        const outputVideoPath = path.join(outFolder, `output_${crypto.createHash('sha256').update('42').digest('hex')}.mp4`);

        console.log("Caminho do vídeo de saída:", outputVideoPath);

        ffmpeg.ffprobe(randomVideoFile, async (err, metadata) => {
            if (err) {
                console.error('Erro ao obter metadados do vídeo:', err);
                throw err;
            }

            const startTime = Math.floor(Math.random() * (metadata.format.duration - 300));
            const maxDuration = 300; // 5 minutos em segundos
            const endTime = startTime + Math.floor(Math.random() * maxDuration);

            console.log('Tempo de início aleatório:', startTime);
            console.log('Tempo de fim aleatório:', endTime);

            try {
                const cutExists = await this.confirmeIfThisCutExist(startTime, endTime, randomVideoFile);
                if (cutExists) {
                    throw new Error('Já existe um corte conflitante.');
                }

                await this.registreVideoCreate(randomVideoFile, startTime, endTime, categoria);

                // Enviar mensagem para a fila usando QueueService
                const message = {
                    inputFile: randomVideoFile,
                    outputFilePath: outputVideoPath,
                    startTime: startTime,
                    endTime: endTime,
                };

                console.log(message)

                await this.queueService.sendToQueueVideo(message);
                console.log('Mensagem enviada para a fila de vídeo:', message);

            } catch (error) {
                console.error('Erro ao criar novo vídeo:', error);
                throw error;
            }
        });
    }

}

