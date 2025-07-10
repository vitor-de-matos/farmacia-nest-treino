import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBatchPromotionDTO } from '../dtos/update-batch-promotion.dto';
import { CreateBatchPromotionDTO } from '../dtos/create-batch-promotion.dto';
import { FindBatchPromotionDTO } from '../dtos/find-batch-promotion.dto';
import { endOfDay, startOfDay } from 'date-fns';
import { IBatchPromotionRepo } from '../interface/batch-promotion-repo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { PromocaoLote } from '../entity/batch-promotion.entity';
import {
  FindManyOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';

@Injectable()
export class BatchPromotionRepository implements IBatchPromotionRepo {
  constructor(
    @InjectRepository(PromocaoLote, DB_PG_DATABASE)
    private readonly repository: Repository<PromocaoLote>,
  ) {}

  async create(batchPromotionDTO: CreateBatchPromotionDTO): Promise<number> {
    const result = await this.repository.save(batchPromotionDTO);
    return result.id;
  }

  async find(filters: FindBatchPromotionDTO): Promise<{
    data: PromocaoLote[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<PromocaoLote> = {
      where: {
        ...(filters.autoEnded && { autoEnded: filters.autoEnded }),
        ...(filters.startDate && {
          startDate: MoreThanOrEqual(startOfDay(filters.startDate)),
        }),
        ...(filters.endDate && {
          expiresAt: LessThanOrEqual(endOfDay(filters.endDate)),
        }),
        ...(filters.productId && { product: { id: filters.productId } }),
        ...(filters.batchId && { batch: { id: filters.batchId } }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
    };

    const [promotionBatches, totalItems] =
      await this.repository.findAndCount(queryOptions);

    const totalPages = filters.quantity
      ? Math.ceil(totalItems / filters.quantity)
      : 1;
    const currentPage = filters.page || 1;
    return { data: promotionBatches, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<PromocaoLote | undefined> {
    const batchPromotion = await this.repository.findOne({ where: { id: id } });
    if (!batchPromotion) {
      throw new NotFoundException({ message: 'Lote não encontrado' });
    }
    return batchPromotion;
  }

  async update(
    Id: number,
    batchPromotionhDTO: UpdateBatchPromotionDTO,
  ): Promise<PromocaoLote> {
    const batchPromotion = await this.repository.findOne({ where: { id: Id } });

    const UpdateBatch = await this.repository.save({
      ...batchPromotion,
      ...batchPromotionhDTO,
    });

    return UpdateBatch;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
