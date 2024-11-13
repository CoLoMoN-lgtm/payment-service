import { Body, Controller, Param, Post, NotFoundException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { InitializeTransactionDto } from './dto/initialize-transaction.dto';
import { AddPaymentDto } from './dto/add-payment.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('initialize')
  async initializeTransaction(@Body() initializeTransactionDto: InitializeTransactionDto) {
    return this.transactionsService.initializeTransaction(initializeTransactionDto.amount);
  }

  @Post(':id/payment')
  async addPayment(
    @Param('id') id: string,
    @Body() addPaymentDto: AddPaymentDto, // Використовуємо AddPaymentDto для параметра amount
  ) {
    try {
      return await this.transactionsService.addPayment(id, addPaymentDto.amount);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post(':id/status')
  async getTransactionStatus(@Param('id') id: string) {
    const transaction = await this.transactionsService.getTransactionById(id);
    if (!transaction) throw new NotFoundException('Транзакція не знайдена');
    return { isComplete: transaction.isComplete };
  }
}
