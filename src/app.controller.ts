import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { VideoMakerService } from './video-maker/video-maker.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly videoMaker: VideoMakerService
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
  createVideo() : Promise<string> {
    return this.videoMaker.createNewVdo();
  }
}
