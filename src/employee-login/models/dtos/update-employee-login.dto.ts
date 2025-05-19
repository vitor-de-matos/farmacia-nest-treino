import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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
  permisionLevel?: number;
}
