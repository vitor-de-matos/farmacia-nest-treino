import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeLoginDTO {
  @ApiProperty({ description: 'ID da pessoa funcionário' })
  @IsNotEmpty()
  @IsNumber()
  personId: number;

  @ApiProperty({ description: 'Login do funcionário' })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  login: string;

  @ApiProperty({ description: 'Senha de acesso do funcionário' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Nível de permissão do funcionário (ex: 1 = comum, 2 = admin)',
  })
  @IsNotEmpty()
  @IsNumber()
  permissionLevel: number;
}
