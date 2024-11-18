import { Injectable } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionsModule } from './transactions/transactions.module';
import { PinoLogger } from 'nestjs-pino';

@Module({
  imports: [PrismaModule, TransactionsModule], 
})
export class AppModule {}

@Injectable()
export class AppService {
  constructor(private readonly logger: PinoLogger) {}

  getHello(): string {
    this.logger.info('Викликається метод getHello у AppService'); // Лог перед виконанням
    const message = 'Hello World!';
    this.logger.info({ message }, 'Метод getHello у AppService завершив виконання'); // Лог результату
    return message;
  }
}