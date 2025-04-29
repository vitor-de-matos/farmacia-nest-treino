import { Controller, Get, Inject, Query } from '@nestjs/common';
import { FindAllBatchPromotionUseCase } from './find-all-batch-promotion.use-case';
import { FindBatchPromotionDTO } from 'src/batchPromotion/models/dtos/find-batch-promotion.dto';
import { PromocaoLote } from 'src/batchPromotion/models/entity/batchPromotion.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Lote promoção')
@ApiBearerAuth('access-token')
@Controller('promotionBatch')
export class FindAllBatchPromotionController {
  constructor(
    @Inject(FindAllBatchPromotionUseCase)
    private readonly batchPromotionService: FindAllBatchPromotionUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca varios lotes em promoção' })
  @ApiOkResponse({})
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() batchPromotionDTO: FindBatchPromotionDTO): Promise<{
    data: PromocaoLote[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.batchPromotionService.find(batchPromotionDTO);
  }
}
