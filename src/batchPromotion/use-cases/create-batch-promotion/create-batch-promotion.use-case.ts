import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBatchPromotionDTO } from 'src/batchPromotion/models/dtos/create-batch-promotion.dto';
import { IBatchPromotionRepo } from 'src/batchPromotion/models/interface/batch-promotion-repo.interface';

@Injectable()
export class CreateBatchPromotionUseCase {
  constructor(
    @Inject('IBatchPromotionRepo')
    private readonly batchPromotionRepository: IBatchPromotionRepo,
  ) {}

  async create(batchPromotionDTO: CreateBatchPromotionDTO): Promise<number> {
    const batchPromotionCreated =
      await this.batchPromotionRepository.create(batchPromotionDTO);
    if (isNaN(batchPromotionCreated)) {
      throw new BadRequestException({
        message: 'Resposta invalida; entre em contato com o suporte',
      });
    }
    return batchPromotionCreated;
  }
}
