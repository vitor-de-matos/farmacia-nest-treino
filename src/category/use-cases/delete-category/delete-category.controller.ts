import { DeleteCategoryUseCase } from './delete-category.use-case';
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

@ApiTags('Categoria')
@ApiBearerAuth('access-token')
@Controller('category')
export class DeleteCategoryController {
  constructor(
    @Inject(DeleteCategoryUseCase)
    private readonly categoryService: DeleteCategoryUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir uma categoria' })
  @ApiOkResponse({ description: 'Categoria removida com sucesso' })
  @ApiNotFoundResponse({ description: 'Categoria não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    await this.categoryService.delete(id);
    return 'Categoria removida com sucesso';
  }
}
