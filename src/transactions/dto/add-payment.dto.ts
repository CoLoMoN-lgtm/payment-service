import { ApiProperty } from '@nestjs/swagger';

export class AddPaymentDto {
  @ApiProperty({ description: 'Сума платежу', example: 100 })
  amount: number;
}
