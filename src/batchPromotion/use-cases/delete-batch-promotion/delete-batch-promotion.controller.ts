import { DeleteBatchPromotionUseCase } from './delete-batch-promotion.use-case';
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

@ApiTags('Lote Promoção')
@ApiBearerAuth('access-token')
@Controller('promotionBatch')
export class DeleteBatchPromotionController {
  constructor(
    @Inject(DeleteBatchPromotionUseCase)
    private readonly batchPromotionService: DeleteBatchPromotionUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir uma promoção de lote' })
  @ApiOkResponse({ description: 'Promoção de lote removido com sucesso' })
  @ApiNotFoundResponse({ description: 'Promoção de lote não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    await this.batchPromotionService.delete(id);
    return 'Promoção lote removido com sucesso';
  }
}
