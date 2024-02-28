import { Module } from '@nestjs/common';
import { CaixaService } from './caixa.service';
import { CaixaController } from './caixa.controller';
import { PrismaModule } from 'prisma/PrismaModule';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/JwtContant';
import { JwtStrategy } from 'src/auth/strategy/localStrategy';

@Module({
  imports: [PrismaModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5d' },
    })],
  controllers: [CaixaController],
  providers: [CaixaService, AuthService, JwtStrategy],
})
export class CaixaModule { }
