import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';
import { Type } from 'class-transformer';

export class FindItemSaleDTO extends PaginationDTO {
  @ApiPropertyOptional({
    example: 12,
    description: 'Filtrar itens pelo ID do produto',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  productId?: number;

  @ApiPropertyOptional({
    example: 34,
    description: 'Filtrar itens pelo ID da venda',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  saleId?: number;

  @ApiPropertyOptional({
    example: 56,
    description: 'Filtrar itens pelo ID do lote',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  batchId?: number;
}
