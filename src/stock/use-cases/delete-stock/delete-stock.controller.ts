import { DeleteStockUseCase } from './delete-stock.use-case';
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
  Delete,
  Inject,
  Param,
} from '@nestjs/common';

@ApiTags('Estoque')
@ApiBearerAuth('access-token')
@Controller('stock')
export class DeleteStockController {
  constructor(
    @Inject(DeleteStockUseCase)
    private readonly stockService: DeleteStockUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir um estoque' })
  @ApiOkResponse({ description: 'Estoque removido com sucesso' })
  @ApiNotFoundResponse({ description: 'Estoque não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    await this.stockService.delete(id);
    return 'Estoque removido com sucesso';
  }
}
