import { Allow, IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateMidiaJobDTO {
  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  icon?: string[];

  @ApiProperty({
    required: false,
    type: 'string',
    format: 'binary',
  })
  @Allow()
  @IsOptional()
  archive?: Express.Multer.File;
}
