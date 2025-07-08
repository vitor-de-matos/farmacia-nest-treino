import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';

export class FindCategoryDTO extends PaginationDTO {
  @ApiPropertyOptional({
    example: 'Bebidas',
    description: 'Nome da categoria do produto',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
