import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  preload(): Promise<string> {
    return this.appService.preload();
  }

  @Get(':number')
  sendMensagem(@Param('number') number: number): Promise<string> {
    return this.appService.getNumberMensage(number)
  }
}
