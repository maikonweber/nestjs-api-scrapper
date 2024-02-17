import { Module } from '@nestjs/common';
import { FutbolService } from './futbol.service';
import { FutbolController } from './futbol.controller';

@Module({
  controllers: [FutbolController],
  providers: [FutbolService],
})
export class FutbolModule {}
