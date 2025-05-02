import { ApiPropertyOptional } from '@nestjs/swagger';
import { TipoPessoa } from '../entity/person.entity';
import {
  IsOptional,
  IsBoolean,
  IsNumber,
  IsString,
  IsEnum,
} from 'class-validator';

export class UpdatePersonDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  document?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  telephone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ enum: TipoPessoa })
  @IsOptional()
  @IsEnum({ TipoPessoa })
  type?: TipoPessoa;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  receivesDiscount?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  discountPercentage?: number;
}
