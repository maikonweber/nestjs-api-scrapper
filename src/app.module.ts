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
import { PrismaModule } from 'prisma/PrismaModule';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/JwtContant';
import { ProductsModule } from './products/products.module';
import { CaixaModule } from './caixa/caixa.module';
import { BinanceService } from './binance/binance.service';
import { OrderModule } from './order/order.module';
import { OrderService } from './order/order.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration module global
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5d' },
    }),
    PrismaModule,
    BinanceModule,
    PaymentModule,
    FutbolModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    CaixaModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService, TasksService, VideoMakerService, TelegramService, BinanceService, OrderService],
})
export class AppModule { }
