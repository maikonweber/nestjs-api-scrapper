import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { TelegramService } from '../src/telegram/telegram.service';

export class GetParamsVideoDTO {
  @ApiProperty()
  channel: string;

  @ApiProperty()
  videoPath: string;
}

export class GetParamsMessageDTO {
  @ApiProperty()
  channel: string;

  @ApiProperty()
  msg: string;
}



@ApiTags('video')
@Controller('video')
export class VideoController {
  constructor(private readonly telegramService: TelegramService) { }

  @Get('create-video/:channel/:path')
  @ApiOperation({ summary: 'Upload a video to a specific channel' })
  @ApiParam({ name: 'channel', type: 'string', description: 'Channel ID' })
  @ApiParam({ name: 'path', type: 'string', description: 'Path to the video file' })
  @ApiResponse({ status: 200, description: 'Video uploaded successfully' })
  @ApiResponse({ status: 500, description: 'Error uploading video' })
  async createVideo(
    @Param() params: GetParamsVideoDTO,
    @Res() res: Response
  ): Promise<void> {
    try {
      const { channel, videoPath } = params;
      await this.telegramService.uploadVideo(channel, videoPath);
      res.status(200).send('Video uploaded successfully');
    } catch (error) {
      res.status(500).send('Error uploading video');
    }
  }

  @Get('send-message/:channel/:msg')
  @ApiOperation({ summary: 'Send a message to a specific chat' })
  @ApiParam({ name: 'channel', type: 'string', description: 'Channel ID' })
  @ApiParam({ name: 'msg', type: 'string', description: 'Message content' })
  @ApiResponse({ status: 200, description: 'Message sent successfully' })
  @ApiResponse({ status: 500, description: 'Error sending message' })
  async sendMessage(
    @Param() params: GetParamsMessageDTO,
    @Res() res: Response
  ): Promise<void> {
    try {
      const { channel, msg } = params;
      await this.telegramService.sendMessageToSpecificChat(msg, channel);
      res.status(200).send('Message sent successfully');
    } catch (error) {
      res.status(500).send('Error sending message');
    }
  }
}