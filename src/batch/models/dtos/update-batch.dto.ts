import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateBatchDTO {
  @ApiPropertyOptional({
    description: 'Novo código do lote',
    example: 'L2025-02',
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({
    description: 'Nova data de validade do lote',
    example: '2026-01-15T00:00:00.000Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiresAt?: Date;

  @ApiPropertyOptional({
    description: 'Novo ID do produto associado ao lote',
    example: 12,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  productId?: number;
}
