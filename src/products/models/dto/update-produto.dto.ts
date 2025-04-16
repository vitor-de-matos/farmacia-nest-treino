import { IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UpdateMidiaJobDTO } from 'src/media/models/dtos/update-midia-others.dto';
import { Type } from 'class-transformer';

export class UpdateProdutoDTO extends UpdateMidiaJobDTO {
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
  @IsString()
  descricao?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  preco?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  quantidade?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  validade?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lote?: string;
}
