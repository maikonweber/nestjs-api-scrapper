import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FutbolService } from './futbol.service';
import { CreateFutbolDto } from './dto/create-futbol.dto';
import { UpdateFutbolDto } from './dto/update-futbol.dto';

@Controller('futbol')
export class FutbolController {
  constructor(private readonly futbolService: FutbolService) { }


}
