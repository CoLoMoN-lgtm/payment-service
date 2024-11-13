import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Експортуємо PrismaService, щоб зробити його доступним для інших модулів
})
export class PrismaModule {}
