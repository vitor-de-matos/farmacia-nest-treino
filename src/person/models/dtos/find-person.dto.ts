import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';
import { TipoPessoa } from '../entity/person.entity';

export class FindPersonDTO extends PaginationDTO {
  @ApiPropertyOptional({
    example: 'Maria',
    description: 'Nome da pessoa para filtro',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: '12345678901',
    description: 'CPF ou CNPJ da pessoa',
  })
  @IsOptional()
  @IsString()
  document?: string;

  @ApiPropertyOptional({
    example: '(11) 98765-4321',
    description: 'Telefone de contato da pessoa',
  })
  @IsOptional()
  @IsString()
  telephone?: string;

  @ApiPropertyOptional({
    example: 'maria@exemplo.com',
    description: 'E-mail da pessoa',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({
    enum: TipoPessoa,
    example: TipoPessoa.CLIENTE,
    description: 'Tipo da pessoa: CLIENTE ou FUNCIONARIO',
  })
  @IsOptional()
  @IsEnum(TipoPessoa)
  type?: TipoPessoa;

  @ApiPropertyOptional({
    default: false,
    example: true,
    description: 'Filtrar pessoas que recebem desconto',
  })
  @IsOptional()
  @IsBoolean()
  receivesDiscount?: boolean;
}
