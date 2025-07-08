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
  @ApiProperty({
    required: true,
    example: 100,
    description: 'Quantidade de itens movimentados no estoque',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @ApiPropertyOptional({
    example: 'Reposição de estoque automático',
    description: 'Observações ou comentários sobre a movimentação',
  })
  @IsOptional()
  @IsString()
  observation?: string;

  @ApiProperty({
    required: true,
    enum: TipoMovimentacao,
    example: TipoMovimentacao.ENTRADA,
    description: 'Tipo da movimentação (ENTRADA ou SAIDA)',
  })
  @IsNotEmpty()
  @IsEnum(TipoMovimentacao)
  movementType: TipoMovimentacao;

  @ApiProperty({
    required: true,
    example: '2024-07-10',
    description: 'Data da movimentação (formato YYYY-MM-DD)',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  movementDate: Date;

  @ApiProperty({
    required: true,
    example: 1,
    description: 'ID do lote relacionado à movimentação',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  batchId: number;
}
