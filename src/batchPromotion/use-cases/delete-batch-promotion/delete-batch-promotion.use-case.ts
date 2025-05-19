import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IBatchPromotionRepo } from 'src/batchPromotion/models/interface/lote-promocao-repo.interface';

@Injectable()
export class DeleteBatchPromotionUseCase {
  constructor(
    @Inject('IBatchPromotionRepo')
    private readonly batchPromotionRepository: IBatchPromotionRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const batchPromotion = await this.batchPromotionRepository.findById(id);

    if (!batchPromotion) {
      throw new NotFoundException({
        message: 'Lote não encontrado',
      });
    }

    await this.batchPromotionRepository.delete(id);
  }
}
