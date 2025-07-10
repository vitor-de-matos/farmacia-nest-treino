import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  IsString,
  Allow,
} from 'class-validator';

export class CreateMidiaDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  url?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  icon?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  productId?: number;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
  })
  @Allow()
  @IsOptional()
  archive?: Express.Multer.File;
}
