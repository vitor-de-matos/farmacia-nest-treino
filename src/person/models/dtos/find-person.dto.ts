import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';
import { TipoPessoa } from '../entity/person.entity';

export class FindPersonDTO extends PaginationDTO {
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
}
