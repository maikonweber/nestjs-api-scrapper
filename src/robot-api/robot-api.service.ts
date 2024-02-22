import { Injectable } from '@nestjs/common';
import { BinanceService } from 'src/binance/binance.service';
import { TelegramService } from 'src/telegram/telegram.service';

@Injectable()
export class RobotApiService {

    BTC_BUSD = 0;
    OrderAlert = '';
    maxPriceM = 0;
    minPriceM = 0;
    BestBuyPrice = 0;
    RSI = 0;
    data;


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

    sendStringValueTelegram() {
        this.telegramService.sendMessageToSpecificChat('', '');
    }



    updateValue() {
        // MaxPriceM = 0 ;
        // MaxPriceM  = 0;
        // Update values fix
    }
}
