import { IsBoolean, IsDate, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';
import { Type } from 'class-transformer';

export class FindBatchPromotionDTO extends PaginationDTO {
  @ApiPropertyOptional({
    description: 'Filtrar promoções iniciadas após esta data',
    example: '2025-08-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'Filtrar promoções que terminam antes desta data',
    example: '2025-08-15T23:59:59.000Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @ApiPropertyOptional({
    description: 'Filtrar promoções pelo ID do produto',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  productId?: number;

  @ApiPropertyOptional({
    description: 'Filtrar promoções pelo ID do lote',
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  batchId?: number;

  @ApiPropertyOptional({
    description: 'Filtrar promoções que já foram encerradas automaticamente',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  autoEnded?: boolean;
}
