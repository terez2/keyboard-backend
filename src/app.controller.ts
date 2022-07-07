import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('next')
  next(): string {
    this.appService.sendMessage('next');
    return 'next';
  }

  @Get('confirm')
  confirm(): string {
    this.appService.sendMessage('confirm');
    return 'confirm';
  }
}
