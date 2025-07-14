import { DeleteItemSaleUseCase } from './delete-item-sale.use-case';
import { AuthGuard } from '@nestjs/passport';
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
  UseGuards,
  Delete,
  Inject,
  Param,
} from '@nestjs/common';

@ApiTags('Item Venda')
@ApiBearerAuth('access-token')
@Controller('itemSale')
@UseGuards(AuthGuard('jwt'))
export class DeleteItemSaleController {
  constructor(
    @Inject(DeleteItemSaleUseCase)
    private readonly itemSaleService: DeleteItemSaleUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir um item de venda' })
  @ApiOkResponse({ description: 'Item de venda removido com sucesso' })
  @ApiNotFoundResponse({ description: 'Item de venda não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    await this.itemSaleService.delete(id);
    return 'Item de venda removido com sucesso';
  }
}
