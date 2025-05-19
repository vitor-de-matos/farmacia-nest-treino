import { ApiPropertyOptional } from '@nestjs/swagger';
import { TipoMovimentacao } from '../entity/stock.entity';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsNumber,
  IsString,
  IsEnum,
  IsDate,
} from 'class-validator';

export class UpdateStockDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  quantity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observation?: string;

  @ApiPropertyOptional({ enum: TipoMovimentacao })
  @IsOptional()
  @IsEnum(TipoMovimentacao)
  movementType?: TipoMovimentacao;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  movementDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  batchId: number;
}
