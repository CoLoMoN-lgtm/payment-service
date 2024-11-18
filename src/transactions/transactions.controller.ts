import { Body, Controller, Param, Post, NotFoundException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { InitializeTransactionDto } from './dto/initialize-transaction.dto';
import { AddPaymentDto } from './dto/add-payment.dto';
import { PinoLogger } from 'nestjs-pino';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly logger: PinoLogger, // Інжекція PinoLogger
  ) {}

  @Post('initialize')
  async initializeTransaction(@Body() initializeTransactionDto: InitializeTransactionDto) {
    this.logger.info({ body: initializeTransactionDto }, 'Отримано запит на ініціалізацію транзакції'); 
    const result = await this.transactionsService.initializeTransaction(initializeTransactionDto.amount);
    this.logger.info({ result }, 'Транзакція успішно ініціалізована'); 
    return result;
  }

  @Post(':id/payment')
  async addPayment(
    @Param('id') id: string,
    @Body() addPaymentDto: AddPaymentDto,
  ) {
    this.logger.info({ id, body: addPaymentDto }, 'Отримано запит на додавання платежу');
    try {
      const result = await this.transactionsService.addPayment(id, addPaymentDto.amount);
      this.logger.info({ result }, 'Платіж успішно додано'); 
      return result;
    } catch (error) {
      this.logger.error({ error }, 'Помилка під час додавання платежу'); 
      throw new NotFoundException(error.message);
    }
  }

  @Post(':id/status')
  async getTransactionStatus(@Param('id') id: string) {
    this.logger.info({ id }, 'Отримано запит на перевірку статусу транзакції'); 
    const transaction = await this.transactionsService.getTransactionById(id);
    if (!transaction) {
      this.logger.warn({ id }, 'Транзакція не знайдена'); 
      throw new NotFoundException('Транзакція не знайдена');
    }
    const result = { isComplete: transaction.isComplete };
    this.logger.info({ result }, 'Статус транзакції успішно отримано'); 
    return result;
  }
}
