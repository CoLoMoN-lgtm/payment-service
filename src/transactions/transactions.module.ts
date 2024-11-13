import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Імпортуємо PrismaModule

@Module({
  imports: [PrismaModule], // Додаємо PrismaModule до імпортів
  providers: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
