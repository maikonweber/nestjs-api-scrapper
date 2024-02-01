import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks-service/tasks-service.service';
import { VideoMakerService } from './video-maker/video-maker.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    
  ],
  controllers: [AppController],
  providers: [AppService, TasksService, VideoMakerService],
})
export class AppModule {}
