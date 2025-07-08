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
  @ApiProperty({
    required: true,
    enum: FormaPagamento,
    example: FormaPagamento.CREDITO,
    description: 'Forma de pagamento (ex: CREDITO, DEBITO, DINHEIRO, etc.)',
  })
  @IsNotEmpty()
  @IsEnum(FormaPagamento)
  paymentMethod: FormaPagamento;

  @ApiPropertyOptional({
    example: '2024-09-01',
    description: 'Data de vencimento do pagamento (formato YYYY-MM-DD)',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dueDate?: Date;

  @ApiProperty({
    required: true,
    example: 250.75,
    description: 'Valor total do pagamento',
  })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  value: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Número da parcela (caso o pagamento seja parcelado)',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  installment?: number;

  @ApiPropertyOptional({
    example: 3,
    description: 'Quantidade total de parcelas',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  totalInstallments?: number;

  @ApiProperty({
    required: true,
    enum: StatusPagamento,
    example: StatusPagamento.PENDENTE,
    description: 'Status atual do pagamento',
  })
  @IsNotEmpty()
  @IsEnum(StatusPagamento)
  status: StatusPagamento;

  @ApiProperty({
    required: true,
    example: 12,
    description: 'ID da venda associada a este pagamento',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  saleId: number;
}
