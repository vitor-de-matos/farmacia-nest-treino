import { FormaPagamento, StatusPagamento } from '../entity/payment.entity';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';
import { Type } from 'class-transformer';

export class FindPaymentDTO extends PaginationDTO {
  @ApiPropertyOptional({
    enum: FormaPagamento,
    example: FormaPagamento.DEBITO,
    description:
      'Forma de pagamento a ser filtrada (ex: CREDITO, DEBITO, etc.)',
  })
  @IsOptional()
  @IsEnum(FormaPagamento)
  paymentMethod?: FormaPagamento;

  @ApiPropertyOptional({
    enum: StatusPagamento,
    example: StatusPagamento.PAGO,
    description: 'Status do pagamento (ex: PENDENTE, PAGO, CANCELADO)',
  })
  @IsOptional()
  @IsEnum(StatusPagamento)
  status?: StatusPagamento;

  @ApiPropertyOptional({
    example: 8,
    description: 'ID da venda relacionada ao pagamento',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  saleId?: number;
}
