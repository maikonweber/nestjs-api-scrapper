import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  async getHello(phone :number, message: string): Promise<string> {
    const browser = await puppeteer.launch({
      // Add any necessary options here
      headless: false,
      userDataDir: 'data/userdata',

    });
    const page = await browser.newPage();
    await page.goto('https://web.whatsapp.com/send?phone=55')
    await new Promise(r => setTimeout(r, 120000));
    let http = `https://web.whatsapp.com/send?phone=55' + ${phone} &text=${message}`
    await new Promise(r => setTimeout(r, 65000));
    await page.keyboard.press('Enter')
    return "Hello World";
  }
}
