import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateManufacturerDTO {
  @ApiProperty({
    required: true,
    example: 'Laboratório Genérico S.A.',
    description: 'Nome da empresa fabricante',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    example: '12345678000199',
    description: 'CNPJ válido da empresa fabricante',
  })
  @IsNotEmpty()
  @IsString()
  cnpj: string;

  @ApiPropertyOptional({
    example: '(11) 98765-4321',
    description: 'Número de contato ou telefone do fabricante',
  })
  @IsOptional()
  @IsString()
  contact?: string;
}
