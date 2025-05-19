import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoMovimentacao } from '../entity/stock.entity';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsDate,
  IsEnum,
} from 'class-validator';

export class CreateStockDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observation?: string;

  @ApiProperty({ required: true, enum: TipoMovimentacao })
  @IsNotEmpty()
  @IsEnum(TipoMovimentacao)
  movementType: TipoMovimentacao;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  movementDate: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  batchId: number;
}
