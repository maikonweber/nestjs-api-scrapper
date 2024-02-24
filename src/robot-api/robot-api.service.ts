import { Injectable } from '@nestjs/common';
import { BinanceService } from 'src/binance/binance.service';
import { TelegramService } from 'src/telegram/telegram.service';


/* 

[
  [
    1499040000000,      // Open time
    "0.01634790",       // Open
    "0.80000000",       // High
    "0.01575800",       // Low
    "0.01577100",       // Close
    "148976.11427815",  // Volume
    1499644799999,      // Close time
    "2434.19055334",    // Quote asset volume
    308,                // Number of trades
    "1756.87402397",    // Taker buy base asset volume
    "28.46694368",      // Taker buy quote asset volume
    "17928899.62484339" // Ignore
  ]
]


*/


@Injectable()
export class RobotApiService {

    BTC_BUSD: number = 0;
    OrderAlert: string = '';
    maxPriceM: number = 0;
    minPriceM: number = 0;
    RSI: number = 0;
    data: [] = [];


    constructor(
        private readonly telegramService: TelegramService,
        private readonly binanceService: BinanceService
    ) { }

    initService() {
        this.updateValue();
        this.operatorValue();
    }

    operatorValue() {

    }

    sendStringValueTelegram(content) {
        let chat_id = ''
        this.telegramService.sendMessageToSpecificChat(content, chat_id);
    }



    async updateValue() {
        // Get the Kline and 
        this.data = await this.binanceService.kline("BTC/BUSD", '1D', 30);
        let closed_map: number[] = this.data.map((e) => 13.09)
        const kline_extract_result = new kline_extract(closed_map);
    }
}


class kline_extract {
    MV1: number;
    MV8: number;
    MV16: number;
    MV30: number;

    constructor(private readonly data: number[]) {
        // Assuming that the data is an array of numbers
        this.MV1 = this.calculateMovingAverage(1);
        this.MV8 = this.calculateMovingAverage(8);
        this.MV16 = this.calculateMovingAverage(16);
        this.MV30 = this.calculateMovingAverage(30);
    }

    private calculateMovingAverage(period: number): number {
        if (period > this.data.length) {
            throw new Error('Period is greater than the length of the data.');
        }

        let sum = 0;
        for (let i = 0; i < period; i++) {
            sum += this.data[i];
        }

        return sum / period;
    }

    private getMinValor(): number {
        if (this.data.length === 0) {
            throw new Error('Data array is empty.');
        }

        return Math.min(...this.data);
    }

    private getMaxValor(): number {
        if (this.data.length === 0) {
            throw new Error('Data array is empty.');
        }

        return Math.max(...this.data);
    }


}

