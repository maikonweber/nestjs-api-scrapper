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
    console.log("Preload Complete")
    return "Hello World";
  }

  async getNumberMensage(phone: number) {
    let text = `Ola, Já pensou no seu próximo destino? 
    Viaje conosco na albatroz viagens
    Temos os melhores valores para sua viagens, Diga sim e 
    lhe enviaremos uma cotação de valores
    `
    let http = `https://web.whatsapp.com/send?phone=55${phone}&text=${text}`
    console.log(http)
    this.page.goto(http);
    await new Promise(r => setTimeout(r, 75000));
    await this.page.keyboard.press('Enter');
    console.log("Preload Complete")
    return "Mensage Send"
  }
}
