import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Spot } from '@binance/connector';
import { kline_extract } from 'src/robot-api/kline_extract';
import { WebsocketStream } from '@binance/connector';

@Injectable()
export class BinanceService {
  private readonly logger = new Logger(BinanceService.name);
  private readonly apiKey;
  private readonly apiSecret;
  private readonly apiUrl;
  private readonly client: Spot;
  private websocketStreamClient: WebsocketStream;


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


  async checkOpenOrders(tradingPair: string): Promise<boolean> {
    try {
      // Get all orders for the specified trading pair
      const allOrders = await this.client.allOrders(tradingPair);

      const openOrders = allOrders.filter(order => order.status === 'NEW' || order.status === 'PARTIALLY_FILLED');

      if (openOrders.length > 0) {
        this.logger.log('You have open orders:');
        allOrders.forEach(order => {
          this.logger.log(`Order ID: ${order.orderId}, Symbol: ${order.symbol}, Type: ${order.type}, Quantity: ${order.origQty}, Price: ${order.price}`);
        });
        return true;
      } else {
        this.logger.log('You have no open orders.');
        return false;
      }
    } catch (error) {
      this.logger.error(`Error checking open orders: ${error.message}`);
      throw error;
    }
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

      console.log(orderResponse);

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