import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateMidiaJobDTO } from 'src/media/models/dtos/create-midia-others.dto';
import { TipoTarja } from '../entity/product.entity';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsString,
  IsEnum,
} from 'class-validator';

export class CreateProdutoDTO extends CreateMidiaJobDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  manufacturerId?: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(TipoTarja)
  labelType?: TipoTarja;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  controlled: string;
}
