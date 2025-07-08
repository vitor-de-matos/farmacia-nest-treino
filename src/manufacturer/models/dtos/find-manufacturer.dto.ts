import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';

export class FindManufacturerDTO extends PaginationDTO {
  @ApiPropertyOptional({
    example: 'Genérico',
    description: 'Filtra por nome do fabricante',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: '12345678000199',
    description: 'Filtra por CNPJ do fabricante',
  })
  @IsOptional()
  @IsString()
  cnpj?: string;

  @ApiPropertyOptional({
    example: '(11) 91234-5678',
    description: 'Filtra por número de contato do fabricante',
  })
  @IsOptional()
  @IsString()
  contact?: string;
}
