import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { TipoMovimentacao } from '../entity/stock.entity';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';

export class FindStockDTO extends PaginationDTO {
  @ApiPropertyOptional({ enum: TipoMovimentacao })
  @IsOptional()
  @IsEnum(TipoMovimentacao)
  movementType?: TipoMovimentacao;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  movementDateStart?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  movementDateEnd?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  batchId: number;
}
