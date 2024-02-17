import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FutbolService } from './futbol.service';
import { CreateFutbolDto } from './dto/create-futbol.dto';
import { UpdateFutbolDto } from './dto/update-futbol.dto';

@Controller('futbol')
export class FutbolController {
  constructor(private readonly futbolService: FutbolService) { }

  @Get()
  GetCurentRound() {
    return this.futbolService.getCurrentRound(71, 2024, true);
  }

  @Get()
  GetFixturePrediction() {
    return this.futbolService.getFixturePrediction(1312);
  }

  @Get()
  GetFixtureOdds() {
    return this.futbolService.getFixtureOdds(1313);
  }

}
