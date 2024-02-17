import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FutbolService } from './futbol.service';
import { CreateFutbolDto } from './dto/create-futbol.dto';
import { UpdateFutbolDto } from './dto/update-futbol.dto';

@Controller('futbol')
export class FutbolController {
  constructor(private readonly futbolService: FutbolService) {}

  @Post()
  create(@Body() createFutbolDto: CreateFutbolDto) {
    return this.futbolService.create(createFutbolDto);
  }

  @Get()
  findAll() {
    return this.futbolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.futbolService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFutbolDto: UpdateFutbolDto) {
    return this.futbolService.update(+id, updateFutbolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.futbolService.remove(+id);
  }
}
