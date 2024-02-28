import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber } from "class-validator";

export enum Tipo {
    RECEITA = 'RECEITA',
    DESPESA = 'DESPESA',
}

export enum SubTipo {
    Compras = 'Compras',
    Lazer = 'Lazer',
    Transporte = 'Transporte',
    Contas = 'Contas',
    Investimentos = 'Investimentos',
}

export class CreateCaixaDto {
    @ApiProperty()
    nome: string;

    @ApiProperty({ enum: Tipo })
    typo: Tipo;

    @ApiProperty()
    valor: number;

    @ApiProperty()
    @IsNumber()
    user_id: number;

    @ApiProperty({ enum: SubTipo })
    sub_tipo: SubTipo;
}

