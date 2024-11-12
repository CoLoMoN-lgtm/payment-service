import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTransactionDto, PartialPaymentDto } from './dto';
import { TransactionStatus } from './transaction-status.enum';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async initializeTransaction(data: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        amount: data.amount,
        status: TransactionStatus.PENDING,
      },
    });
  }

  async partialPayment(transactionId: string, data: PartialPaymentDto) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    const updatedPaidAmount = transaction.paidAmount + data.amount;
    await this.prisma.payment.create({
      data: {
        amount: data.amount,
        transactionId,
      },
    });

    const isCompleted = updatedPaidAmount >= transaction.amount;

    await this.prisma.transaction.update({
      where: { id: transactionId },
      data: {
        paidAmount: updatedPaidAmount,
        status: isCompleted ? TransactionStatus.COMPLETED : TransactionStatus.PENDING,
      },
    });

    return isCompleted ? 'Transaction completed' : 'Partial payment accepted';
  }
}
