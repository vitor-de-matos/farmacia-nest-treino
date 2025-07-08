import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';
import { Type } from 'class-transformer';

export class FindSalesDTO extends PaginationDTO {
  @ApiPropertyOptional({
    example: '12345678901',
    description: 'CPF do cliente para filtrar as vendas',
  })
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiPropertyOptional({
    example: '2024-01-01',
    description: 'Data inicial de emissão da venda (formato YYYY-MM-DD)',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  emissionDateStart?: Date;

  @ApiPropertyOptional({
    example: '2024-12-31',
    description: 'Data final de emissão da venda (formato YYYY-MM-DD)',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  emissionDateEnd?: Date;

  @ApiPropertyOptional({
    example: 10,
    description: 'ID do cliente para filtrar as vendas',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  customerId?: number;

  @ApiPropertyOptional({
    example: 3,
    description: 'ID do funcionário responsável pela venda',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  employeeId?: number;
}
