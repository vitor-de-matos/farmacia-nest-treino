import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateMidiaJobDTO } from 'src/media/models/dtos/create-midia-others.dto';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TipoTarja } from '../entity/product.entity';

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
  @IsBoolean()
  controlled: boolean;
}
