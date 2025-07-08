import { IsBoolean, IsDate, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateBatchPromotionDTO {
  @ApiPropertyOptional({
    description: 'Nova data de início da promoção',
    example: '2025-08-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'Nova data de término da promoção',
    example: '2025-08-15T23:59:59.000Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @ApiPropertyOptional({
    description: 'Novo ID do produto promovido',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  productId?: number;

  @ApiPropertyOptional({
    description: 'Novo preço promocional',
    example: 9.99,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  promotionPrice?: number;

  @ApiPropertyOptional({
    description: 'Novo ID do lote vinculado à promoção',
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  batchId?: number;

  @ApiPropertyOptional({
    description: 'Indica se a promoção foi encerrada automaticamente',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  autoEnded?: boolean;
}
