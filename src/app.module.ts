import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks-service/tasks-service.service';
import { VideoMakerService } from './video-maker/video-maker.service';
import { TelegramService } from './telegram/telegram.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration module global
    })
  ],
  controllers: [AppController],
  providers: [AppService, TasksService, VideoMakerService, TelegramService],
})
export class AppModule {}
