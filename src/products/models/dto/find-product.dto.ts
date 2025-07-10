import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';
import { Type } from 'class-transformer';

export class FindProductDTO extends PaginationDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Filtrar apenas produtos com ícone',
  })
  @IsOptional()
  icon?: boolean;

  @ApiPropertyOptional({
    example: 3,
    description: 'ID da categoria do produto',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId?: number;

  @ApiPropertyOptional({
    example: 2,
    description: 'ID do fabricante do produto',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  manufacturerId?: number;

  @ApiPropertyOptional({
    example: 'Dipirona',
    description: 'Nome (ou parte do nome) do produto',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 10, description: 'Preço mínimo para filtro' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minPrice?: number;

  @ApiPropertyOptional({ example: 50, description: 'Preço máximo para filtro' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxPrice?: number;

  @ApiPropertyOptional({
    example: 5,
    description: 'Quantidade mínima no estoque',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minQuantity?: number;

  @ApiPropertyOptional({
    example: 100,
    description: 'Quantidade máxima no estoque',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxQuantity?: number;

  @ApiPropertyOptional({
    example: '2025-01-01',
    description: 'Data inicial de validade',
  })
  @IsOptional()
  @IsString()
  deadlineStart?: string;

  @ApiPropertyOptional({
    example: '2025-12-31',
    description: 'Data final de validade',
  })
  @IsOptional()
  @IsString()
  deadlineEnd?: string;

  @ApiPropertyOptional({ example: 'L12345', description: 'Número do lote' })
  @IsOptional()
  @IsString()
  batch?: string;
}
