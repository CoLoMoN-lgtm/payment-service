import { ApiProperty } from '@nestjs/swagger';

export class InitializeTransactionDto {
  @ApiProperty({ description: 'Сума транзакції', example: 1000 })
  amount: number;
}
