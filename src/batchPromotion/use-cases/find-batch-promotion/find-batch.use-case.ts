import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IBatchPromotionRepo } from 'src/batchPromotion/models/interface/batch-promotion-repo.interface';
import { PromocaoLote } from 'src/batchPromotion/models/entity/batch-promotion.entity';

@Injectable()
export class FindBatchPromotionUseCase {
  constructor(
    @Inject('IBatchPromotionRepo')
    private readonly batchRepositoryRepository: IBatchPromotionRepo,
  ) {}

  async find(batchRepositoryId: number): Promise<PromocaoLote> {
    const batchPromotion =
      await this.batchRepositoryRepository.findById(batchRepositoryId);
    if (!batchPromotion) {
      throw new NotFoundException({
        message: 'Promoção de lote não encontrada',
      });
    }
    return batchPromotion;
  }
}
