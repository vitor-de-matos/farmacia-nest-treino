import { FormaPagamento, StatusPagamento } from '../entity/payment.entity';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';
import { Type } from 'class-transformer';

export class FindPaymentDTO extends PaginationDTO {
  @ApiPropertyOptional({ enum: FormaPagamento })
  @IsOptional()
  @IsEnum(FormaPagamento)
  paymentMethod?: FormaPagamento;

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
