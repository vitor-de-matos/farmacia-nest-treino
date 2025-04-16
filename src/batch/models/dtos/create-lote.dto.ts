import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLoteDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  expiresAt: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  productId: number;
}
