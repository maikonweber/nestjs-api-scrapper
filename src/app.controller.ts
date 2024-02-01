import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { VideoMakerService } from './video-maker/video-maker.service';
import { TelegramService } from './telegram/telegram.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly videoMaker: VideoMakerService,
    private readonly telegramService: TelegramService
    ) {}

  // @Get()
  // preload(): Promise<string> {
  //   return this.appService.preload();
  // }

  // @Get(':number')
  // sendMensagem(@Param('number') number: number): Promise<string> {
  //   return this.appService.getNumberMensage(number)
  // }

  @Get('/create-video')
  async createVideo() : Promise<void> {
    const string = await this.videoMaker.createNewVdo();
    return this.telegramService.uploadVideo('-4057079951', string)
  }

  @Get('/send-message')
  async sendMessage() {
    return this.telegramService.sendMessageToSpecificChat('Ola',"-4057079951")
  }
}
