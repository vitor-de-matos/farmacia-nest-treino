import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateItemSaleDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  unitPrice: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  subtotal: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  productId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  saleId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  batchId: number;
}
