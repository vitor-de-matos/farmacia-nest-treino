import { UpdateBatchPromotionUseCase } from './update-batch-promotion.use-case';
import { UpdateBatchDTO } from 'src/batch/models/dtos/update-batch.dto';
import { PromocaoLote } from 'src/batchPromotion/models/entity/batch-promotion.entity';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  UseGuards,
  Inject,
  Param,
  Patch,
  Body,
} from '@nestjs/common';

@ApiTags('Lote Promoção')
@ApiBearerAuth('access-token')
@Controller('promotionBatch')
@UseGuards(AuthGuard('jwt'))
export class UpdateBatchPromotionController {
  constructor(
    @Inject(UpdateBatchPromotionUseCase)
    private readonly updatePromocaoLoteService: UpdateBatchPromotionUseCase,
  ) {}

  @ApiOperation({ summary: 'Modifica promoção de lote' })
  @ApiBody({ type: UpdateBatchDTO })
  @ApiOkResponse({ description: 'Promoção de lote atualizado' })
  @ApiNotFoundResponse({ description: 'Promoção de lote não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() batchPromotionDTO: UpdateBatchDTO,
  ): Promise<PromocaoLote> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    return await this.updatePromocaoLoteService.update(id, batchPromotionDTO);
  }
}
