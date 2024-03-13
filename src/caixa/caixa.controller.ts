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
    return this.caixaService.create(createCaixaDto, req.user.id);
  }

  @Get("find-all")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: any) {
    return this.caixaService.findAll(req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('find-one/:id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.caixaService.findOne(+id, req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCaixaDto: UpdateCaixaDto, @Request() req: any) {
    return this.caixaService.update(+id, updateCaixaDto, req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.caixaService.remove(+id, req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('get-despesa')
  async getAllDespesa(@Param('id') id: string, @Request() req: any) {
    try {
      const despesa = await this.caixaService.findAllDespesa(req.user.id); // Assuming this returns the desired data
      return { success: true, data: despesa }; // Return a JSON response with data
    } catch (error) {
      console.error('Error fetching despesa:', error);
      return { success: false, error: 'An error occurred while fetching despesa' }; // Return error response
    }
  }

}
