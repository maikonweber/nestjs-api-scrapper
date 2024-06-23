import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger'; // Importações do Swagger
import { FutbolService } from './futbol.service';

@ApiTags('futbol') // Define o nome da tag para a documentação Swagger
@Controller('futbol')
export class FutbolController {
  constructor(private readonly futbolService: FutbolService) { }

  @Get('/current-round/:current/:season/:league')
  @ApiResponse({ status: 200, description: 'Current round information.' })
  @ApiParam({ name: 'current', type: 'boolean' })
  @ApiParam({ name: 'season', type: 'number' })
  @ApiParam({ name: 'league', type: 'number' })
  getCurrentRound(
    @Param('current') current: boolean,
    @Param('season') season: number,
    @Param('league') league: number,
  ) {
    return this.futbolService.getCurrentRound(71, 2024, true); // Você pode ajustar isso para usar os parâmetros recebidos
  }

  @Get('/fixture-prediction/:fixture')
  @ApiResponse({ status: 200, description: 'Fixture prediction information.' })
  @ApiParam({ name: 'fixture', type: 'number' })
  getFixturePrediction(@Param('fixture') fixture: number) {
    return this.futbolService.getFixturePrediction(1312); // Ajuste para usar o parâmetro recebido
  }

  @Get('/fixture-odds/:fixture')
  @ApiResponse({ status: 200, description: 'Fixture odds information.' })
  @ApiParam({ name: 'fixture', type: 'number' })
  getFixtureOdds(@Param('fixture') fixture: number) {
    return this.futbolService.getFixtureOdds(1313); // Ajuste para usar o parâmetro recebido
  }
}
