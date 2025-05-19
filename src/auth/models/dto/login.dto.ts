import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({ required: true, format: 'password' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  remember: boolean;
}
