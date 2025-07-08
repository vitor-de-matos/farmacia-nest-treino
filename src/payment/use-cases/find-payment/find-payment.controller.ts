import { FindPaymentUseCase } from './find-payment.use-case';
import { Pagamento } from 'src/payment/models/entity/payment.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  Inject,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Pagamento')
@ApiBearerAuth('access-token')
@Controller('payment')
@UseGuards(AuthGuard('jwt'))
export class FindPaymentController {
  constructor(
    @Inject(FindPaymentUseCase)
    private readonly paymentService: FindPaymentUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca pagamento por ID' })
  @ApiOkResponse({})
  @ApiNotFoundResponse({ description: 'Pagamento não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<Pagamento> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida; era esperado um ID numérico válido.',
      });
    }
    return await this.paymentService.find(id);
  }
}
