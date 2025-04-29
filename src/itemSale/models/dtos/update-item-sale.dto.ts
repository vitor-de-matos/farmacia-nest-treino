import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateItemSaleDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  unitPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  subtotal?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  productId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  saleId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  batchId?: number;
}
