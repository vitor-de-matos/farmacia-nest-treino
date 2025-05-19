import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEmployeeLoginDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  personId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  login?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  permissionLevel?: number;
}
