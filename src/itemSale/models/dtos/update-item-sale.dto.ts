import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateItemSaleDTO {
  @ApiPropertyOptional({ description: 'Quantidade do item' })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiPropertyOptional({ description: 'Preço unitário do produto' })
  @IsOptional()
  @IsNumber()
  unitPrice?: number;

  @IsOptional()
  @IsNumber()
  subtotal?: number;

  @ApiPropertyOptional({
    description: 'ID do produto associado',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  productId?: number;

  @ApiPropertyOptional({ description: 'ID da venda' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  saleId?: number;

  @ApiPropertyOptional({ description: 'ID do lote do produto' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  batchId?: number;
}
