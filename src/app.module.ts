import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks-service/tasks-service.service';
import { VideoMakerService } from './video-maker/video-maker.service';
import { TelegramService } from './telegram/telegram.service';
import { ConfigModule } from '@nestjs/config';
import { BinanceModule } from './binance/binance.module';
import { PaymentModule } from './payment/payment.module';
import { FutbolModule } from './futbol/futbol.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration module global
    }),
    BinanceModule,
    PaymentModule,
    FutbolModule
  ],
  controllers: [AppController],
  providers: [AppService, TasksService, VideoMakerService, TelegramService],
})
export class AppModule {}
