import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule'
import { AppService } from 'src/app.service';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);
    constructor(private readonly apiService: AppService) {
        
    }
    // @Cron('45 * * * * *')
    // async handleCron() {
    //     const number: string = `119${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
    //     this.logger.debug("Called when the current second is 45", number);
    //     await this.apiService.getNumberMensage(parseInt(number))
    // }

}
