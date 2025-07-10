import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { CreateBatchPromotionUseCase } from './create-batch-promotion.use-case';
import { CreateBatchPromotionDTO } from 'src/batchPromotion/models/dtos/create-batch-promotion.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Lote Promoção')
@ApiBearerAuth('access-token')
@Controller('promotionBatch')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class CreateBatchPromotionController {
  constructor(
    @Inject(CreateBatchPromotionUseCase)
    private readonly batchPromotionService: CreateBatchPromotionUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar lote' })
  @ApiBody({ type: CreateBatchPromotionDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(
    @Body() batchPromotionDTO: CreateBatchPromotionDTO,
  ): Promise<number> {
    return await this.batchPromotionService.create(batchPromotionDTO);
  }
}
