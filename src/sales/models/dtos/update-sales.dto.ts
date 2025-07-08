import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateSalesDTO {
  @ApiPropertyOptional({
    example: '12345678901',
    description: 'CPF do cliente (caso precise ser alterado)',
  })
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiPropertyOptional({
    example: 150.75,
    description: 'Novo valor total da venda (até duas casas decimais)',
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  totalValue?: number;

  @ApiPropertyOptional({
    example: '2024-07-15',
    description: 'Nova data de emissão (formato YYYY-MM-DD)',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  emissionDate?: Date;

  @ApiPropertyOptional({
    example: 5,
    description: 'Novo ID do cliente associado à venda',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  customerId?: number;

  @ApiPropertyOptional({
    example: 2,
    description: 'Novo ID do funcionário responsável pela venda',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  employeeId?: number;
}
