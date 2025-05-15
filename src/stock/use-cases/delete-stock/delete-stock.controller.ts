import {
  Controller,
  Delete,
  Inject,
  NotAcceptableException,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteStockUseCase } from './delete-stock.use-case';

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
