import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoPessoa } from '../entity/person.entity';
import {
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsString,
  IsEnum,
} from 'class-validator';

export class CreatePersonDTO {
  @ApiProperty({
    required: true,
    example: 'João Silva',
    description: 'Nome completo da pessoa',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: '12345678901',
    description: 'CPF ou CNPJ da pessoa',
  })
  @IsOptional()
  @IsString()
  document?: string;

  @ApiPropertyOptional({
    example: '(11) 99999-9999',
    description: 'Número de telefone para contato',
  })
  @IsOptional()
  @IsString()
  telephone?: string;

  @ApiPropertyOptional({
    example: 'joao@email.com',
    description: 'E-mail da pessoa',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    required: true,
    enum: TipoPessoa,
    example: TipoPessoa.CLIENTE,
    description: 'Tipo da pessoa: CLIENTE ou FUNCIONARIO',
  })
  @IsNotEmpty()
  @IsEnum(TipoPessoa)
  type: TipoPessoa;

  @ApiPropertyOptional({
    default: false,
    example: false,
    description: 'Indica se a pessoa recebe desconto',
  })
  @IsOptional()
  @IsBoolean()
  receivesDiscount?: boolean;

  @ApiPropertyOptional({
    example: 10.5,
    description: 'Percentual de desconto (caso aplicável)',
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  discountPercentage?: number;
}
