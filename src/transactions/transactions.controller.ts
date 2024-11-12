import { Controller, Post, Body, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, PartialPaymentDto } from './dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  initializeTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.initializeTransaction(createTransactionDto);
  }

  @Post(':id/payment')
  partialPayment(
    @Param('id') id: string,
    @Body() partialPaymentDto: PartialPaymentDto,
  ) {
    return this.transactionsService.partialPayment(id, partialPaymentDto);
  }
}
