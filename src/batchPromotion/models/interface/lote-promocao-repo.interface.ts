import { UpdateBatchPromotionDTO } from '../dtos/update-batch-promotion.dto';
import { CreateBatchPromotionDTO } from '../dtos/create-batch-promotion.dto';
import { FindBatchPromotionDTO } from '../dtos/find-batch-promotion.dto';
import { PromocaoLote } from '../entity/batchPromotion.entity';

export interface IBatchPromotionRepo {
  create(batchPromotionDTO: CreateBatchPromotionDTO): Promise<number>;
  find(filters: FindBatchPromotionDTO): Promise<{
    data: PromocaoLote[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<PromocaoLote | undefined>;
  update(
    id: number,
    batchPromotionDTO: UpdateBatchPromotionDTO,
  ): Promise<PromocaoLote>;
  delete(id: number): Promise<void>;
}
