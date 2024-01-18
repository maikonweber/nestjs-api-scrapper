import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  public page;
  async preload(): Promise<string> {
    const browser = await puppeteer.launch({
      // Add any necessary options here
      headless: false,
      userDataDir: 'data/userdata',
    });

    this.page = await browser.newPage();
    await this.page.goto('https://web.whatsapp.com/')
    await new Promise(r => setTimeout(r, 65000));
 
    return "Hello World";
  }

  async getNumberMensage(phone: number, message: string) {
    let http = `https://web.whatsapp.com/send?phone=55' + ${phone} &text=${message}`
    this.page.goto(http);
    await new Promise(r => setTimeout(r, 65000));
    this.page.keyboard.press('Enter');

    return "Mensage Send"
  }
}
