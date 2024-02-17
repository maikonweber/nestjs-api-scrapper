import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'prisma/PrismaService';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './JwtContant';


@Module({
  controllers: [
    AuthController,
  ],
  imports: [
    JwtModule.register({
      privateKey: jwtConstants.secret,
      signOptions: { expiresIn: '5d' }
    })],
  providers: [AuthService, PrismaService],
})
export class AuthModule { }
