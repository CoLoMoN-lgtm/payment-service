import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async initializeTransaction(amount: number) {
    return this.prisma.transaction.create({
      data: {
        amount,
        isComplete: false,
      },
    });
  }

  async addPayment(transactionId: string, paymentAmount: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: transactionId },
    });
    
    if (!transaction || transaction.isComplete) {
      throw new NotFoundException('Транзакція не знайдена або вже завершена');
    }

    await this.prisma.payment.create({
      data: {
        transactionId,
        amount: paymentAmount,
      },
    });

    const payments = await this.prisma.payment.findMany({
      where: { transactionId },
      select: { amount: true },
    });
    const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);

    if (totalPaid >= transaction.amount) {
      await this.prisma.transaction.update({
        where: { id: transactionId },
        data: { isComplete: true },
      });
    }

    return { totalPaid, isComplete: totalPaid >= transaction.amount };
  }

  async getTransactionById(id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });
    
    if (!transaction) {
      throw new NotFoundException('Транзакція не знайдена');
    }

    return transaction;
  }
}
