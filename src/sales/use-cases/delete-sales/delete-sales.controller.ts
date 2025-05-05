import { DeleteSalesUseCase } from './delete-sales.use-case';
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
  Delete,
  Inject,
  Param,
} from '@nestjs/common';

@ApiTags('Vendas')
@ApiBearerAuth('access-token')
@Controller('sales')
export class DeleteSalesController {
  constructor(
    @Inject(DeleteSalesUseCase)
    private readonly salesService: DeleteSalesUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir uma venda' })
  @ApiOkResponse({ description: 'Venda removida com sucesso' })
  @ApiNotFoundResponse({ description: 'Venda não encontrada.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    await this.salesService.delete(id);
    return 'Venda removida com sucesso';
  }
}
