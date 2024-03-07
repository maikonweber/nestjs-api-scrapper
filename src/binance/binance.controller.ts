import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BinanceService } from './binance.service';
import { CreateBinanceDto } from './dto/create-binance.dto';
import { UpdateBinanceDto } from './dto/update-binance.dto';

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) { }

  @Get("get-candles")
  getCandles() {
    return this.binanceService.getMarketKlineDataWithStatic("BTCUSDT", "1d", 99);
  }


}
