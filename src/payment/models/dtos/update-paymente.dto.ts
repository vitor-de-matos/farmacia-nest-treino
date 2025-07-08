import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { FormaPagamento, StatusPagamento } from '../entity/payment.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdatePaymentDTO {
  @ApiPropertyOptional({
    enum: FormaPagamento,
    example: FormaPagamento.PIX,
    description: 'Nova forma de pagamento (ex: CREDITO, DEBITO, DINHEIRO, PIX)',
  })
  @IsOptional()
  @IsEnum(FormaPagamento)
  paymentMethod?: FormaPagamento;

  @ApiPropertyOptional({
    example: '2024-09-15',
    description: 'Nova data de vencimento (formato ISO 8601)',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dueDate?: Date;

  @ApiPropertyOptional({
    example: 320.5,
    description: 'Novo valor do pagamento (até 2 casas decimais)',
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  value?: number;

  @ApiPropertyOptional({
    example: 2,
    description: 'Número da nova parcela (caso parcelado)',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  installment?: number;

  @ApiPropertyOptional({
    example: 4,
    description: 'Quantidade total de parcelas (caso parcelado)',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  totalInstallments?: number;

  @ApiPropertyOptional({
    enum: StatusPagamento,
    example: StatusPagamento.PAGO,
    description: 'Novo status do pagamento (ex: PENDENTE, PAGO, CANCELADO)',
  })
  @IsOptional()
  @IsEnum(StatusPagamento)
  status?: StatusPagamento;

  @ApiPropertyOptional({
    example: 10,
    description: 'ID da venda relacionada a este pagamento',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  saleId?: number;
}
