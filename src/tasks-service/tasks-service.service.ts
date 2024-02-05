import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule'
import { AppService } from 'src/app.service';
import { TelegramService } from 'src/telegram/telegram.service';
import { VideoMakerService } from 'src/video-maker/video-maker.service';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);
    constructor(
        private readonly apiService: AppService,
        private readonly videoMaker: VideoMakerService,
        private readonly telegramService: TelegramService
        ) {
        
    }
    @Cron('0 */2 * * *')
    
    async handleVideoMensage(){
      const nameString = await this.videoMaker.createNewVdo()
      return this.telegramService.uploadVideo('-4057079951', nameString)
    }
    // async handleCron() {
    //     const number: string = `119${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
    //     this.logger.debug("Called when the current second is 45", number);
    //     await this.apiService.getNumberMensage(parseInt(number))
    // }

}
