import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ required: true, format: 'password' })
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  remember: boolean;
}
