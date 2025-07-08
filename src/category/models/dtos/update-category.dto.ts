import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDTO {
  @ApiPropertyOptional({
    example: 'Bebidas',
    description: 'Nome da categoria do produto',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
