import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class QueueService {
  constructor(
    @Inject('VIDEO_SERVICE') private readonly clientQueue1: ClientProxy,
    @Inject('EMAIL_SERVICE') private readonly clientQueue2: ClientProxy,
  ) { }

  async sendToQueueVideo(payload: any) {
    const pattern = { cmd: 'video-maker-queue-anime' };
    return this.clientQueue1.send<string>(pattern, payload).toPromise();
  }

  async sendToQueueEmail(payload: any) {
    const pattern = { cmd: 'email-nagano-queue' };
    return this.clientQueue2.send<string>(pattern, payload).toPromise();
  }
}