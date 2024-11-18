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
    this.logger.info('Викликається метод getHello'); // Лог перед виконанням методу
    const result = this.appService.getHello();
    this.logger.info({ result }, 'Метод getHello завершив виконання'); // Лог після виконання методу
    return result;
  }
}
