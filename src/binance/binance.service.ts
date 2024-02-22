import { Injectable, Logger } from '@nestjs/common';
import { CreateBinanceDto } from './dto/create-binance.dto';
import { UpdateBinanceDto } from './dto/update-binance.dto';
import { ConfigService } from '@nestjs/config';
import moment from 'moment';
import crypto from 'crypto';
import querystring from 'querystring';
import axios from 'axios';

@Injectable()
export class BinanceService {
  private readonly logger = new Logger(BinanceService.name);
  private readonly apiKey;
  private readonly apiUrl;
  private readonly apiSecret;
  constructor(private readonly configService: ConfigService) {
    this.apiKey = configService.get<string>("BINANCE_KEY");
    this.apiUrl = configService.get<string>("BINANCE_URL");
    this.apiSecret = configService.get<string>("BINANCE_SECRET");
  }

  async privateCall(path, data = {}, method = "GET") {
    const timestamp = moment().valueOf();
    const signature = crypto.createHmac('sha256', this.apiSecret)
      .update(`${querystring.stringify({ ...data, timestamp })}`)
      .digest('hex');

    const newData = { ...data, timestamp, signature };
    const qs = `?${querystring.stringify(newData)}`;

    try {
      const result = await axios({
        method,
        url: `${this.apiUrl}${path}${qs}`,
        headers: { 'X-MBX-APIKEY': this.apiKey }
      })
      return result.data;
    } catch (err) {
      this.logger.error(err);
    }
  }

  async kline(symbol: string, interval: string, limit: number) {
    return this.publicCall('v3/klines', { symbol, interval, limit })
  }

  async ticker(symbol: string) {
    return this.publicCall('/v3/ticker/24hr', { symbol })
  }

  async publicCall(path, data = {}, method = "GET") {
    try {
      const qs = data ? `?${querystring.stringify(data)}` : '';
      const result = await axios({
        method: method,
        url: `${this.apiUrl}${path}${qs}`
      })

      return result.data;

    } catch (err) {
      this.logger.error(err);
    }
  }

  async time() {
    return this.publicCall('/v3/time')
  }
}
