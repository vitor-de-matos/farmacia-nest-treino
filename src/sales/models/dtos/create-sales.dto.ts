import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsDate,
} from 'class-validator';

export class CreateSalesDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  totalValue: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  emissionDate: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  customerId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  employeeId: number;
}
