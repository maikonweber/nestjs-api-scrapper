import { Controller, Get, Param, Post, Body, Query, Res, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { BinanceService } from './binance.service';
import { Response } from 'express';

@ApiTags('binance')
@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) { }

  @Get('check-open-orders/:tradingPair')
  @ApiOperation({ summary: 'Check open orders for a trading pair' })
  @ApiParam({ name: 'tradingPair', type: 'string', description: 'Trading pair (e.g., BTCUSDT)' })
  @ApiResponse({ status: 200, description: 'Open orders checked successfully' })
  @ApiResponse({ status: 500, description: 'Error checking open orders' })
  async checkOpenOrders(@Param('tradingPair') tradingPair: string, @Res() res: Response): Promise<void> {
    try {
      const hasOpenOrders = await this.binanceService.checkOpenOrders(tradingPair);
      res.status(HttpStatus.OK).json({ hasOpenOrders });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error checking open orders', error: error.message });
    }
  }

  @Get('account-info')
  @ApiOperation({ summary: 'Get account information' })
  @ApiResponse({ status: 200, description: 'Account information retrieved successfully' })
  @ApiResponse({ status: 500, description: 'Error retrieving account information' })
  async getAccountInformation(@Res() res: Response): Promise<void> {
    try {
      const accountInfo = await this.binanceService.getAccountInformation();
      res.status(HttpStatus.OK).json(accountInfo);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error retrieving account information', error: error.message });
    }
  }

  @Post('place-order')
  @ApiOperation({ summary: 'Place a new order' })
  @ApiBody({ schema: { example: { symbol: 'BTCUSDT', side: 'BUY', type: 'LIMIT', params: { quantity: 1, price: 50000 } } } })
  @ApiResponse({ status: 201, description: 'Order placed successfully' })
  @ApiResponse({ status: 500, description: 'Error placing order' })
  async placeNewOrder(@Body() body: { symbol: string, side: string, type: string, params: any }, @Res() res: Response): Promise<void> {
    try {
      const { symbol, side, type, params } = body;
      const orderResponse = await this.binanceService.placeNewOrder(symbol, side, type, params);
      res.status(HttpStatus.CREATED).json(orderResponse);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error placing order', error: error.message });
    }
  }

  @Get('market-kline-data')
  @ApiOperation({ summary: 'Get market kline data' })
  @ApiQuery({ name: 'symbol', type: 'string', description: 'Trading pair (e.g., BTCUSDT)' })
  @ApiQuery({ name: 'interval', type: 'string', description: 'Interval (e.g., 1m, 5m, 1d)' })
  @ApiQuery({ name: 'limit', type: 'number', description: 'Number of data points to retrieve' })
  @ApiResponse({ status: 200, description: 'Market kline data retrieved successfully' })
  @ApiResponse({ status: 500, description: 'Error retrieving market kline data' })
  async getMarketKlineData(@Query('symbol') symbol: string, @Query('interval') interval: string, @Query('limit') limit: number, @Res() res: Response): Promise<void> {
    try {
      const klineData = await this.binanceService.getMarketKlineData(symbol, interval, limit);
      res.status(HttpStatus.OK).json(klineData);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error retrieving market kline data', error: error.message });
    }
  }

  @Get('market-kline-data-static')
  @ApiOperation({ summary: 'Get market kline data with statistics' })
  @ApiQuery({ name: 'symbol', type: 'string', description: 'Trading pair (e.g., BTCUSDT)' })
  @ApiQuery({ name: 'interval', type: 'string', description: 'Interval (e.g., 1m, 5m, 1d)' })
  @ApiQuery({ name: 'limit', type: 'number', description: 'Number of data points to retrieve' })
  @ApiResponse({ status: 200, description: 'Market kline data with statistics retrieved successfully' })
  @ApiResponse({ status: 500, description: 'Error retrieving market kline data with statistics' })
  async getMarketKlineDataWithStatic(@Query('symbol') symbol: string, @Query('interval') interval: string, @Query('limit') limit: number, @Res() res: Response): Promise<void> {
    try {
      const klineData = await this.binanceService.getMarketKlineDataWithStatic(symbol, interval, limit);
      res.status(HttpStatus.OK).json(klineData);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error retrieving market kline data with statistics', error: error.message });
    }
  }
}
