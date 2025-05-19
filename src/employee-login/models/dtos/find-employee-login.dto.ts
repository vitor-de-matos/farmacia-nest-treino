import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';

export class FindEmployeeLoginDTO extends PaginationDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  login?: string;
}
