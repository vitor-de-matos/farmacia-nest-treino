import { ApiPropertyOptional } from '@nestjs/swagger';
import { TipoPessoa } from '../entity/person.entity';
import {
  IsOptional,
  IsBoolean,
  IsNumber,
  IsString,
  IsEnum,
} from 'class-validator';

export class UpdatePersonDTO {
  @ApiPropertyOptional({
    example: 'Carlos Silva',
    description: 'Novo nome da pessoa',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: '98765432100',
    description: 'Novo documento (CPF/CNPJ) da pessoa',
  })
  @IsOptional()
  @IsString()
  document?: string;

  @ApiPropertyOptional({
    example: '(21) 91234-5678',
    description: 'Novo número de telefone da pessoa',
  })
  @IsOptional()
  @IsString()
  telephone?: string;

  @ApiPropertyOptional({
    example: 'carlos@empresa.com',
    description: 'Novo e-mail da pessoa',
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
    description: 'Se a pessoa agora recebe desconto',
  })
  @IsOptional()
  @IsBoolean()
  receivesDiscount?: boolean;

  @ApiPropertyOptional({
    example: 15.5,
    description: 'Novo percentual de desconto',
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  discountPercentage?: number;
}
