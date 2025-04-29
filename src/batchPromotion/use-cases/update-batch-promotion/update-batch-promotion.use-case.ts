import { UpdateBatchPromotionDTO } from 'src/batchPromotion/models/dtos/update-batch-promotion.dto';
import { IBatchPromotionRepo } from 'src/batchPromotion/models/interface/lote-promocao-repo.interface';
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class UpdateBatchPromotionUseCase {
  constructor(
    @Inject('IBatchPromotionRepo')
    private readonly batchPromotionRepository: IBatchPromotionRepo,
  ) {}

  async update(
    batchRepositoryId: number,
    batchRepositoryDTO: UpdateBatchPromotionDTO,
  ) {
    const batchPromotion =
      await this.batchPromotionRepository.findById(batchRepositoryId);
    if (!batchPromotion) {
      throw new NotFoundException({
        message: 'Promoção de lote não encontrada',
      });
    }

    const updated = await this.batchPromotionRepository.update(
      batchRepositoryId,
      batchRepositoryDTO,
    );

    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar a promoção de lote no banco de dados',
      });
    }

    return updated;
  }
}
