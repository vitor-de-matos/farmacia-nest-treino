import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({ example: 'admin', required: true })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: 'admin', required: true, format: 'password' })
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  remember: boolean;
}
