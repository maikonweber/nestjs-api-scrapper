import { Injectable, Logger } from '@nestjs/common';
import { CreateFutbolDto } from './dto/create-futbol.dto';
import { UpdateFutbolDto } from './dto/update-futbol.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FutbolService {
  private readonly logger = new Logger(FutbolService.name);
  private readonly BASE_URL;
  private readonly TOKEN;
  private readonly Country;


  constructor(
    private readonly configService: ConfigService) {
    this.BASE_URL = configService.get<string>("BASE_URL_FUTEBOL");
    this.TOKEN = configService.get<string>("FUTEBOL_TOKEN");
    this.Country = "Brazil";
  }


  async getCurrentRound(league: number, season: number, current: boolean) {
    this.logger.log(`Get Current Round, League: ${league} Seasson: ${season}`)
    const response = await axios.get(`${this.BASE_URL}/fixtures`, {
      headers: {
        'x-apisports-key': this.TOKEN
      }, params: {
        league: league,
        season: season,
      }
    })

    return response.data.response
  }

  async getFixturePrediction(fixtures: number): Promise<string> {
    this.logger.log(`Fixture prediction ${fixtures}`);
    const response = await axios.get(`${this.BASE_URL}/predictions`, {
      headers: {
        'x-apisports-key': this.TOKEN
      }, params: {
        fixtures: fixtures,
      }
    });
    console.log(response.data.response)
    return response.data.response
  }

  async getFixtureOdds(fixtures: number): Promise<string> {
    this.logger.log(`Fixture prediction ${fixtures}`);
    const response = await axios.get(`${this.BASE_URL}/odds`, {
      headers: {
        'x-apisports-key': this.TOKEN
      }, params: {
        fixtures: fixtures,
      }
    });
    console.log(response.data.response)

    return response.data.response
  }

}
