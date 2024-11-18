import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PinoLogger } from 'nestjs-pino';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: PinoLogger, // Інжекція PinoLogger
  ) {}

  @Get()
  getHello(): string {
    const result = this.appService.getHello();
 
    return result;
  }
}
