import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEmployeeLoginDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  personId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  permisionLevel: number;
}
