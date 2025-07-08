import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateBatchPromotionDTO {
  @ApiProperty({
    required: true,
    example: '2025-08-01T00:00:00.000Z',
    description: 'Data de início da promoção',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    required: true,
    example: '2025-08-15T23:59:59.000Z',
    description: 'Data de fim da promoção',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @ApiProperty({
    required: true,
    example: 1,
    description: 'ID do produto promovido',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  productId: number;

  @ApiProperty({
    required: true,
    example: 9.99,
    description: 'Preço promocional aplicado ao produto',
  })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  promotionPrice: number;

  @ApiProperty({
    required: true,
    example: 5,
    description: 'ID do lote em que a promoção se aplica',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  batchId: number;
}
