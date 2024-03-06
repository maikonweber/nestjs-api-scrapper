import { Injectable } from '@nestjs/common';
import { CreateCaixaDto, Tipo } from './dto/create-caixa.dto';
import { UpdateCaixaDto } from './dto/update-caixa.dto';
import { PrismaService } from 'prisma/PrismaService';
import Decimal from 'decimal.js';

@Injectable()
export class CaixaService {
  constructor(private readonly prismaService: PrismaService) {
  }

  create(createCaixaDto: CreateCaixaDto, user_id: number) {

    if (createCaixaDto.valor < 0) {
      throw new Error("O valor tem que ser numerico positivo")
    }

    if (createCaixaDto.typo === "DESPESA") {
      // Make the value negative if it's positive
      createCaixaDto.valor = -createCaixaDto.valor;
    } else if (createCaixaDto.typo === "RECEITA") {
      // Make the value positive if it's negative
      createCaixaDto.valor = Math.abs(createCaixaDto.valor);
    }

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

  findAll(user_id: number) {
    return this.prismaService.caixa_central.findMany({
      where: {
        user_id: user_id
      }
    });
  }

  findAllDespesa() {
    return this.prismaService.caixa_central.findMany({
      where: {
        typo: "DESPESA"
      }
    })
  }


  async getAllValorReceita(user_id: number) {
    const receitas = await this.prismaService.caixa_central.findMany({
      where: {
        typo: "RECEITA",
        user_id: user_id
      },
      select: {
        valor: true
      }
    });

    // Sum the values of Receita
    // Somar os valores de Receita
    const receitaTotal = receitas.reduce(
      (sum, receita) => new Decimal(sum).plus(receita.valor),
      new Decimal(0)
    );


    return receitaTotal

  }

  async getSaldo(user_id: number) {
    const receitaTotal = await this.getAllValorReceita(user_id);
    const despesaTotal = await this.getAllValorDespesa(user_id);

    // Subtract Despesa from Receita to get the saldo
    const saldo = new Decimal(receitaTotal).minus(despesaTotal);

    return saldo.toNumber(); // Convert back to a regular number if needed
  }


  async getAllValorDespesa(user_id: number) {
    const receitas = await this.prismaService.caixa_central.findMany({
      where: {
        typo: "DESPESA",
        user_id: user_id
      },
      select: {
        valor: true
      }
    });

    // Sum the values of Receita
    // Somar os valores de Receita
    const receitaTotal = receitas.reduce(
      (sum, receita) => new Decimal(sum).plus(receita.valor),
      new Decimal(0)
    );


    return receitaTotal

  }

  findAllReceita(user_id: number) {
    return this.prismaService.caixa_central.findMany({
      where: {
        typo: "RECEITA",
        user_id: user_id
      }
    })
  }

  findWhereDate(startTime: Date, endTime: Date, user_id: number) {
    return this.prismaService.caixa_central.findMany({
      where: {
        // @ts-ignore
        user_id: user_id,
        registre_date: {
          lte: new Date(startTime),
          gte: new Date(endTime)
        }
      }
    })
  }



  findOne(id: number, user_id: number) {
    return this.prismaService.caixa_central.findFirstOrThrow({
      where: {
        id: id,
        user_id: user_id
      }
    });
  }

  findOneByType(type: Tipo, user_id: number) {
    return this.prismaService.caixa_central.findFirstOrThrow({
      where: {
        typo: type,
        user_id: user_id
      }
    })
  }

  findOneByName(name: string, user_id: number) {
    return this.prismaService.caixa_central.findFirstOrThrow({
      where: {
        nome: name,
        user_id: user_id
      }
    })
  }

  update(id: number, updateCaixaDto: UpdateCaixaDto, user_id: number) {
    return this.prismaService.caixa_central.update({
      data: updateCaixaDto,
      where: {
        id: id,
        user_id: user_id
      }
    }
    );
  }

  remove(id: number, user_id: number) {
    return this.prismaService.caixa_central.delete({
      where: {
        id: id,
        user_id: user_id
      }
    });
  }

  removeAll(user_id: number) {
    return this.prismaService.caixa_central.deleteMany({
      where: {
        user_id: user_id
      }
    });
  }
}
