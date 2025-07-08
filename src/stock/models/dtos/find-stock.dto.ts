import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TipoMovimentacao } from '../entity/stock.entity';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';
import { Type } from 'class-transformer';

export class FindStockDTO extends PaginationDTO {
  @ApiPropertyOptional({
    enum: TipoMovimentacao,
    example: TipoMovimentacao.ENTRADA,
    description: 'Tipo de movimentação para filtrar (ENTRADA ou SAIDA)',
  })
  @IsOptional()
  @IsEnum(TipoMovimentacao)
  movementType?: TipoMovimentacao;

  @ApiPropertyOptional({
    example: '2024-01-01',
    description: 'Data inicial para filtrar movimentações',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  movementDateStart?: Date;

  @ApiPropertyOptional({
    example: '2024-12-31',
    description: 'Data final para filtrar movimentações',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  movementDateEnd?: Date;

  @ApiPropertyOptional({
    example: 5,
    description: 'ID do lote relacionado à movimentação',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  batchId?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiration?: Date;
}
