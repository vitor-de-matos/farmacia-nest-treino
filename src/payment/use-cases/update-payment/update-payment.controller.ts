import { UpdatePaymentUseCase } from './update-payment.use-case';
import { UpdatePaymentDTO } from 'src/payment/models/dtos/update-paymente.dto';
import { Pagamento } from 'src/payment/models/entity/payment.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  Inject,
  Param,
  Patch,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Pagamento')
@ApiBearerAuth('access-token')
@Controller('payment')
@UseGuards(AuthGuard('jwt'))
export class UpdatePaymentController {
  constructor(
    @Inject(UpdatePaymentUseCase)
    private readonly paymentService: UpdatePaymentUseCase,
  ) {}

  @ApiOperation({ summary: 'Modifica pagamento' })
  @ApiBody({ type: UpdatePaymentDTO })
  @ApiOkResponse({ description: 'Pagamento atualizado' })
  @ApiNotFoundResponse({ description: 'Pagamento não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() paymentDTO: UpdatePaymentDTO,
  ): Promise<Pagamento> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    return await this.paymentService.update(id, paymentDTO);
  }
}
