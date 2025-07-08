import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateBatchDTO {
  @ApiProperty({
    required: true,
    example: 'L2025-01',
    description: 'Código identificador do lote',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    required: true,
    example: '2025-12-31T00:00:00.000Z',
    description: 'Data de validade do lote',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  expiresAt: Date;

  @ApiProperty({
    required: true,
    example: 10,
    description: 'ID do produto relacionado ao lote',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  productId: number;
}
