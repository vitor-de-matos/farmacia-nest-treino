import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { FindAllPaymentUseCase } from './find-all-payment.use-case';
import { FindPaymentDTO } from 'src/payment/models/dtos/find-payment.dto';
import { Pagamento } from 'src/payment/models/entity/payment.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Pagamento')
@ApiBearerAuth('access-token')
@Controller('payment')
@UseGuards(AuthGuard('jwt'))
export class FindAllPaymentController {
  constructor(
    @Inject(FindAllPaymentUseCase)
    private readonly paymentService: FindAllPaymentUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca varios item de venda' })
  @ApiOkResponse({})
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() itemSaleDTO: FindPaymentDTO): Promise<{
    data: Pagamento[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.paymentService.find(itemSaleDTO);
  }
}
