import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateItemSaleDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
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
