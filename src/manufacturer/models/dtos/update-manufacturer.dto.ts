import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateManufacturerDTO {
  @ApiPropertyOptional({
    example: 'Farmacêutica Moderna LTDA',
    description: 'Novo nome do fabricante',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: '98765432000188',
    description: 'Novo CNPJ do fabricante',
  })
  @IsOptional()
  @IsString()
  cnpj?: string;

  @ApiPropertyOptional({
    example: '(11) 92345-6789',
    description: 'Novo telefone de contato do fabricante',
  })
  @IsOptional()
  @IsString()
  contact?: string;
}
