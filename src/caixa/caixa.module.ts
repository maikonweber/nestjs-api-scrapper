import { Module } from '@nestjs/common';
import { CaixaService } from './caixa.service';
import { CaixaController } from './caixa.controller';

@Module({
  controllers: [CaixaController],
  providers: [CaixaService],
})
export class CaixaModule {}
