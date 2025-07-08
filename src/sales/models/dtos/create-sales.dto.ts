import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsDate,
} from 'class-validator';

export class CreateSalesDTO {
  @ApiPropertyOptional({
    example: '12345678901',
    description: 'CPF do cliente (opcional, apenas se aplicável)',
  })
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiProperty({
    required: true,
    example: 199.99,
    description: 'Valor total da venda com até duas casas decimais',
  })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  totalValue: number;

  @ApiProperty({
    required: true,
    example: '2024-08-01',
    description: 'Data de emissão da venda (formato ISO 8601)',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  emissionDate: Date;

  @ApiProperty({
    required: true,
    example: 5,
    description: 'ID do cliente que realizou a compra',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  customerId: number;

  @ApiProperty({
    required: true,
    example: 2,
    description: 'ID do funcionário que realizou a venda',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  employeeId: number;
}
