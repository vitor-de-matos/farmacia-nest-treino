import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { FormaPagamento, StatusPagamento } from '../entity/payment.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdatePaymentDTO {
  @ApiPropertyOptional({ enum: FormaPagamento })
  @IsOptional()
  @IsEnum(FormaPagamento)
  paymentMethod?: FormaPagamento;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dueDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  value?: number;

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

  @ApiPropertyOptional({ enum: StatusPagamento })
  @IsOptional()
  @IsEnum(StatusPagamento)
  status?: StatusPagamento;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  saleId?: number;
}
