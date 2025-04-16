import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';
import { Type } from 'class-transformer';

export class FindProdutoDTO extends PaginationDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  icon?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoriaId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  fabricanteId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  precoMin?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  precoMax?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  quantidadeMin?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  quantidadeMax?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  validadeStart?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  validadeEnd?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lote?: string;
}
