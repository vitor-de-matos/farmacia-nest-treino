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
  @ApiPropertyOptional({
    example: 75,
    description: 'Nova quantidade de itens no estoque',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  quantity?: number;

  @ApiPropertyOptional({
    example: 'Correção de contagem manual',
    description: 'Nova observação associada à movimentação',
  })
  @IsOptional()
  @IsString()
  observation?: string;

  @ApiPropertyOptional({
    enum: TipoMovimentacao,
    example: TipoMovimentacao.SAIDA,
    description: 'Novo tipo de movimentação (ENTRADA ou SAIDA)',
  })
  @IsOptional()
  @IsEnum(TipoMovimentacao)
  movementType?: TipoMovimentacao;

  @ApiPropertyOptional({
    example: '2024-08-15',
    description: 'Nova data da movimentação (formato ISO 8601)',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  movementDate?: Date;

  @ApiPropertyOptional({
    example: 3,
    description: 'Novo ID do lote relacionado à movimentação',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  batchId: number;
}
