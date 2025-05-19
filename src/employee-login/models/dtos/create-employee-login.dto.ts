import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  permissionLevel: number;
}
