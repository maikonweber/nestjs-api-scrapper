import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Spot } from '@binance/connector';
import { kline_extract } from 'src/robot-api/kline_extract';

@Injectable()
export class BinanceService {
  private readonly logger = new Logger(BinanceService.name);
  private readonly apiKey;
  private readonly apiSecret;
  private readonly apiUrl;
  private readonly client: Spot;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = configService.get<string>('BINANCE_KEY');
    this.apiSecret = configService.get<string>('BINANCE_SECRET');
    this.apiUrl = configService.get<string>('BINANCE_URL');

    // Initialize the Binance Spot client
    this.client = new Spot(
      this.apiKey,
      this.apiSecret,
    );
  }


  async getAccountInformation() {
    try {
      const accountInfo = await this.client.account();
      return accountInfo.data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async placeNewOrder(symbol: string, side: string, type: string, params: any) {
    try {
      const orderResponse = await this.client.newOrder(symbol, side, type, params);
      return orderResponse.data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getMarketKlineData(symbol: string, interval: string, limit: number) {
    try {
      const klineData = await this.client.klines(symbol, interval, { limit: limit })
      return klineData.data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getMarketKlineDataWithStatic(symbol: string, interval: string, limit: number) {
    try {
      const klineData = await this.client.klines(symbol, interval, { limit: limit })
      const estatistica = new kline_extract(klineData.data)
      return estatistica.getAllProperties();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}