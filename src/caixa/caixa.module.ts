import { Module } from '@nestjs/common';
import { CaixaService } from './caixa.service';
import { CaixaController } from './caixa.controller';
import { PrismaModule } from 'prisma/PrismaModule';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/JwtContant';

@Module({
  imports: [PrismaModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5d' },
    })],
  controllers: [CaixaController],
  providers: [CaixaService, AuthService],
})
export class CaixaModule { }
