import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':number:message')
  getHello(@Param('number') number: number,@Param('message') message: string): Promise<string> {
    return this.appService.getHello(number, message);
  }
}
