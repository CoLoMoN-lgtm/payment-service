import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { LoggerModule } from 'nestjs-pino';
import { PrismaModule } from '../prisma/prisma.module'; 

@Module({
  imports: [LoggerModule.forRoot(), PrismaModule], 
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
