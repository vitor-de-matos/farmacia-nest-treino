import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEmployeeLoginDTO {
  @ApiPropertyOptional({ description: 'Novo ID da pessoa associada ao login' })
  @IsOptional()
  @IsNumber()
  personId?: number;

  @ApiPropertyOptional({ description: 'Novo login do funcionário' })
  @IsOptional()
  @IsString()
  login?: string;

  @ApiPropertyOptional({ description: 'Nova senha de acesso do funcionário' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({
    description: 'Novo nível de permissão do funcionário',
  })
  @IsOptional()
  @IsNumber()
  permissionLevel?: number;
}
