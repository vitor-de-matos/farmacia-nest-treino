import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';

export class FindEmployeeLoginDTO extends PaginationDTO {
  @ApiPropertyOptional({
    description: 'Filtrar por nome de login',
  })
  @IsOptional()
  @IsString()
  login?: string;

  @ApiPropertyOptional({ description: 'Filtrar pelo ID da pessoa funcionário' })
  @IsOptional()
  @IsNumber()
  personId?: number;
}
