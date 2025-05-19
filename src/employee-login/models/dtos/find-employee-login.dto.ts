import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';

export class FindEmployeeLoginDTO extends PaginationDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  login?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  personId?: number;
}
