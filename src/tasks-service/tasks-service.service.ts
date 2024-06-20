import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule'
import { AppService } from 'src/app.service';
import { BinanceService } from 'src/binance/binance.service';
import { OrderService } from 'src/order/order.service';
import { TelegramService } from 'src/telegram/telegram.service';
import { VideoMakerService } from 'src/video-maker/video-maker.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly apiService: AppService,
    private readonly videoMaker: VideoMakerService,
    private readonly telegramService: TelegramService,
    private readonly binanceService: BinanceService,
    private readonly orderService: OrderService
  ) {

  }
  @Cron('0 */2 * * *')
  async handleVideoMensage() {
    const nameString = await this.videoMaker.createNewVdo("Anime")
    return this.telegramService.uploadVideo('-4057079951', nameString)
  }

  // @Cron(CronExpression.EVERY_MINUTE)
  // async binanceRobot() {
  //   const data = await this.binanceService.getMarketKlineDataWithStatic("BTCUSDT", '1m', 99);
  //   const current_price = (await this.binanceService.getMarketKlineData("BTCUSDT", '1m', 1))[0][4];
  //   const haveOpenOrder = await this.orderService.getLastOpenTrue();
  //   const orderOpen = await this.binanceService.checkOpenOrders("BTCUSDT")

  //   if (orderOpen) return console.log("Have Order open inside Binance")


  //   if (haveOpenOrder) {

  //     const id = haveOpenOrder.id
  //     const minutes = 99;
  //     const keep_live = minutes * 60 * 1000;
  //     const created_date = new Date(haveOpenOrder.created).getTime();
  //     const amount = 10
  //     const quantity = (current_price) => amount / current_price;

  //     const orderParams = {
  //       price: '10',
  //       quantity: 0.00014,
  //       timeInForce: 'GTC'
  //     };

  //     const created_date_keeplive = created_date + keep_live;

  //     const keep_live_now = created_date_keeplive < new Date().getTime()

  //     if (keep_live_now) {
  //       console.log("Keep live Active")
  //       await this.orderService.updateOrder(current_price, id);
  //       await this.binanceService.placeNewOrder("BTCUSDT", "SELL", "LIMIT", orderParams)
  //       return
  //     }

  //     if (current_price > data.MV8) {
  //       console.log("Current price  up the MV8");
  //       await this.orderService.updateOrder(current_price, id);
  //       orderParams.price = current_price
  //       await this.binanceService.placeNewOrder("BTCUSDT", "SELL", "LIMIT", orderParams)
  //       return
  //     }

  //     return
  //   } else {

  //     const amount = 10
  //     const quantity = (current_price) => amount / current_price;

  //     const orderParams = {
  //       price: '10',
  //       quantity: 0.00014,
  //       timeInForce: 'GTC'
  //     };
  //     if (current_price < data.MV99) {
  //       console.log("Buy price above MV8")

  //       orderParams.price = current_price




  //       await this.orderService.create(current_price);
  //       await this.binanceService.placeNewOrder("BTCUSDT", "BUY", "LIMIT", orderParams)
  //       return
  //     }
  //   }
  // }
}

