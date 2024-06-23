import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) { }

  // @Get('/sendToQueue1')
  // async sendToQueueVideo() {
  //   const payload = { message: 'Hello from Queue1' };
  //   return this.queueService.sendToQueueVideo(payload);
  // }

  // @Get('/sendToQueue2')
  // async sendToQueueEmail() {
  //   const payload = { message: 'Hello from Queue2' };
  //   return this.queueService.sendToQueueEmail(payload);
  // }
}

