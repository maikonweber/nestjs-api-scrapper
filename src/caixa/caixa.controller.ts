import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CaixaService } from './caixa.service';
import { CreateCaixaDto } from './dto/create-caixa.dto';
import { UpdateCaixaDto } from './dto/update-caixa.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { JwtStrategy } from 'src/auth/strategy/localStrategy';
import { JwtAuthGuard } from 'src/auth/Guard/localGuard';

@ApiTags('Caixa')
@Controller('caixa')
export class CaixaController {
  constructor(private readonly caixaService: CaixaService) { }

  @Post("add-fluxo-caixa")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateCaixaDto })
  create(@Body() createCaixaDto: CreateCaixaDto, @Request() req: any) {
    const user_id = 1
    return this.caixaService.create(createCaixaDto, req.user.id);
  }

  @Get("find-all")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.caixaService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('find-one/:id')
  findOne(@Param('id') id: string) {
    return this.caixaService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCaixaDto: UpdateCaixaDto) {
    return this.caixaService.update(+id, updateCaixaDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.caixaService.remove(+id);
  }
}
