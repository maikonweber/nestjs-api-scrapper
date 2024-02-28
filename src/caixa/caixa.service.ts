import { Injectable } from '@nestjs/common';
import { CreateCaixaDto, Tipo } from './dto/create-caixa.dto';
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
    return this.prismaService.caixa_central.findMany();
  }

  findOne(id: number) {
    return this.prismaService.caixa_central.findFirstOrThrow({
      where: {
        id: id
      }
    });
  }

  findOneByType(type: Tipo) {
    return this.prismaService.caixa_central.findFirstOrThrow({
      where: {
        typo: type
      }
    })
  }

  findOneByName(name: string) {
    return this.prismaService.caixa_central.findFirstOrThrow({
      where: {
        nome: name
      }
    })
  }

  update(id: number, updateCaixaDto: UpdateCaixaDto) {
    return this.prismaService.caixa_central.update({
      data: updateCaixaDto,
      where: {
        id: id
      }
    }
    );
  }

  remove(id: number) {
    return this.prismaService.caixa_central.delete({
      where: {
        id: id
      }
    });
  }

  removeAll(id: number) {
    return this.prismaService.caixa_central.deleteMany();
  }
}
