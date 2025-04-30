import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FormaPagamento, StatusPagamento } from '../entity/payment.entity';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsEnum,
} from 'class-validator';

export class CreatePaymentDTO {
  @ApiProperty({ required: true, enum: FormaPagamento })
  @IsNotEmpty()
  @IsEnum({ FormaPagamento })
  paymentMethod: FormaPagamento;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dueDate?: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  value: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  installment?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  totalInstallments?: number;

  @ApiProperty({ required: true, enum: StatusPagamento })
  @IsNotEmpty()
  @IsEnum({ StatusPagamento })
  status: StatusPagamento;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  saleId: number;
}
