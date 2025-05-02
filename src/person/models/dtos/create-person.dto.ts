import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoPessoa } from '../entity/person.entity';
import {
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsString,
  IsEnum,
} from 'class-validator';

export class CreatePersonDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

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

  @ApiProperty({ required: true, enum: TipoPessoa })
  @IsNotEmpty()
  @IsEnum({ TipoPessoa })
  type: TipoPessoa;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  receivesDiscount?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  discountPercentage?: number;
}
