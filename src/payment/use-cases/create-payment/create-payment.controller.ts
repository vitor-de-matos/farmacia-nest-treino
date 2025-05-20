import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreatePaymentUseCase } from './create-payment.use-case';
import { CreatePaymentDTO } from 'src/payment/models/dtos/create-payment.dto';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Pagamento')
@ApiBearerAuth('access-token')
@Controller('payment')
export class CreatePaymentController {
  constructor(
    @Inject(CreatePaymentUseCase)
    private readonly paymentService: CreatePaymentUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar pagamento' })
  @ApiBody({ type: CreatePaymentDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(@Body() paymentDTO: CreatePaymentDTO): Promise<number> {
    return await this.paymentService.create(paymentDTO);
  }
}
