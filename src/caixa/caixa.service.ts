import { Injectable } from '@nestjs/common';
import { CreateCaixaDto } from './dto/create-caixa.dto';
import { UpdateCaixaDto } from './dto/update-caixa.dto';
import { PrismaService } from 'prisma/PrismaService';

@Injectable()
export class CaixaService {
  constructor(private readonly prismaService: PrismaService) {
  }

  create(createCaixaDto: CreateCaixaDto, user_id: number) {
    return this.prismaService.caixa_central.create({
      data: {
        nome: createCaixaDto.nome,
        typo: createCaixaDto.typo,
        valor: createCaixaDto.valor,
        user_id: user_id,
        sub_tipo: createCaixaDto.sub_tipo
      }
    })
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
