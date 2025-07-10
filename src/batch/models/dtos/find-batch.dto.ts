import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';
import { Type } from 'class-transformer';

export class FindBatchDTO extends PaginationDTO {
  @ApiPropertyOptional({
    description: 'Filtrar lotes pelo código (parcial ou completo)',
    example: 'L2025-01',
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({
    description: 'Filtrar lotes que vencem em uma data específica',
    example: '2025-12-31T00:00:00.000Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiresAt?: Date;

  @ApiPropertyOptional({
    description: 'Filtrar lotes pelo ID do produto',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  productId?: number;
}
