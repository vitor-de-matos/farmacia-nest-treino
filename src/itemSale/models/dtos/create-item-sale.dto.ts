import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateItemSaleDTO {
  @ApiProperty({
    required: true,
    example: 2,
    description: 'Quantidade de itens vendidos',
  })
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

  @ApiProperty({
    required: true,
    example: 12,
    description: 'ID do produto vendido',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  productId: number;

  @ApiProperty({
    required: true,
    example: 5,
    description: 'ID da venda associada ao item',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  saleId: number;

  @ApiProperty({
    required: true,
    example: 3,
    description: 'ID do lote relacionado ao item vendido',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  batchId: number;
}
