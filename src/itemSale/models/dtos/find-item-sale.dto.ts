import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';
import { Type } from 'class-transformer';

export class FindItemSaleDTO extends PaginationDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  productId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  saleId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  batchId?: number;
}
