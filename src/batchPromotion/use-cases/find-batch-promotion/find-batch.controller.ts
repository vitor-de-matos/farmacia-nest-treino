import { FindBatchPromotionUseCase } from './find-batch.use-case';
import { PromocaoLote } from 'src/batchPromotion/models/entity/batch-promotion.entity';
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
  Inject,
  Param,
  Get,
} from '@nestjs/common';

@ApiTags('Lote Promoção')
@ApiBearerAuth('access-token')
@Controller('promotionBatch')
@UseGuards(AuthGuard('jwt'))
export class FindBatchPromotionController {
  constructor(
    @Inject(FindBatchPromotionUseCase)
    private readonly batchPromotionService: FindBatchPromotionUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca promoção de lote por ID' })
  @ApiOkResponse({})
  @ApiNotFoundResponse({ description: 'Promoção de lote não encontrada.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<PromocaoLote> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida; era esperado um ID numérico válido.',
      });
    }
    return await this.batchPromotionService.find(id);
  }
}
