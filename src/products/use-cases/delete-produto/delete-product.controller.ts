import { DeleteProdutoUseCase } from './delete-product.use-case';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
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

@ApiTags('Produto')
@ApiBearerAuth('access-token')
@Controller('product')
export class DeleteProdutoController {
  constructor(
    @Inject(DeleteProdutoUseCase)
    private readonly productService: DeleteProdutoUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir produto' })
  @ApiOkResponse({ description: 'Produto deletado com sucesso' })
  @ApiNotAcceptableResponse({
    description: 'Id inválido.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    if (!id) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    await this.productService.delete(id);
    return 'Produto deletado com sucesso';
  }
}
