import { FindBatchPromotionDTO } from 'src/batchPromotion/models/dtos/find-batch-promotion.dto';
import { IBatchPromotionRepo } from 'src/batchPromotion/models/interface/lote-promocao-repo.interface';
import { Inject, Injectable } from '@nestjs/common';
import { PromocaoLote } from 'src/batchPromotion/models/entity/batchPromotion.entity';

@Injectable()
export class FindAllBatchPromotionUseCase {
  constructor(
    @Inject('IBatchPromotionRepo')
    private readonly batchPromotionRepository: IBatchPromotionRepo,
  ) {}

  async find(batchPromotionDTO: FindBatchPromotionDTO): Promise<{
    data: PromocaoLote[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.batchPromotionRepository.find(batchPromotionDTO);
  }
}
