import { Injectable } from '@nestjs/common';
import { CreateCaixaDto } from './dto/create-caixa.dto';
import { UpdateCaixaDto } from './dto/update-caixa.dto';
import { PrismaService } from 'prisma/PrismaService';

@Injectable()
export class CaixaService {
  constructor(private readonly prismaService: PrismaService) {
  }

  create(createCaixaDto: CreateCaixaDto) {
    // Criar controle de caixa entrada e saida.
    return 
  }

  findAll() {
    return `This action returns all caixa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} caixa`;
  }

  update(id: number, updateCaixaDto: UpdateCaixaDto) {
    return `This action updates a #${id} caixa`;
  }

  remove(id: number) {
    return `This action removes a #${id} caixa`;
  }
}
