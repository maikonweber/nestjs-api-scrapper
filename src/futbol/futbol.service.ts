import { Injectable } from '@nestjs/common';
import { CreateFutbolDto } from './dto/create-futbol.dto';
import { UpdateFutbolDto } from './dto/update-futbol.dto';
import axios from 'axios';

@Injectable()
export class FutbolService {
  private readonly BASE_URL;
  private readonly TOKEN;
  private readonly Country;

  constructor() {
          
  }

  create(createFutbolDto: CreateFutbolDto) {
    return 'This action adds a new futbol';
  }

  findAll() {
    return `This action returns all futbol`;
  }

  findOne(id: number) {
    return `This action returns a #${id} futbol`;
  }

  update(id: number, updateFutbolDto: UpdateFutbolDto) {
    return `This action updates a #${id} futbol`;
  }

  remove(id: number) {
    return `This action removes a #${id} futbol`;
  }
}
