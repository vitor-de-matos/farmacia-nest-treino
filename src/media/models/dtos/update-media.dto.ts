import { Allow, IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMidiaDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  icon?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  url?: string;

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
