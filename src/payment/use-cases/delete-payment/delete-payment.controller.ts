import { DeletePaymentUseCase } from './delete-payment.use-case';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  UseGuards,
  Delete,
  Inject,
  Param,
} from '@nestjs/common';

@ApiTags('Pagamento')
@ApiBearerAuth('access-token')
@Controller('payment')
@UseGuards(AuthGuard('jwt'))
export class DeletePaymentController {
  constructor(
    @Inject(DeletePaymentUseCase)
    private readonly paymentService: DeletePaymentUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir um pagamento' })
  @ApiOkResponse({ description: 'Pagamento removido com sucesso' })
  @ApiNotFoundResponse({ description: 'Pagamento não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    await this.paymentService.delete(id);
    return 'Pagamento removido com sucesso';
  }
}
