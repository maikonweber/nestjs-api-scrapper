import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { AppModule } from 'src/app.module';
import { rabbitMQConfig } from 'src/rabbit.config';
import { ClientsModule } from '@nestjs/microservices';
import { VideoMakerService } from 'src/video-maker/video-maker.service';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/PrismaService';

@Module({
  imports: [
    ClientsModule.register(rabbitMQConfig),  // Correct usage without type arguments
  ],
  controllers: [QueueController,

  ],
  providers: [QueueService, VideoMakerService, PrismaService],
})
export class QueueModule { }
