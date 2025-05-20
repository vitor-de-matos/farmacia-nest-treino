import { FindManyOptions, ILike, LessThanOrEqual, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { UpdateBatchDTO } from '../dtos/update-lote.dto';
import { CreateBatchDTO } from '../dtos/create-lote.dto';
import { FindBatchDTO } from '../dtos/find-lote.dto';
import { IBatchRepo } from '../interface/lote-repo.interface';
import { endOfDay } from 'date-fns';
import { Lote } from '../entity/batch.entity';

@Injectable()
export class BatchRepository implements IBatchRepo {
  constructor(
    @InjectRepository(Lote, DB_PG_DATABASE)
    private readonly repository: Repository<Lote>,
  ) {}

  async create(batchDTO: CreateBatchDTO): Promise<number> {
    const result = await this.repository.save({
      ...batchDTO,
      product: batchDTO.productId ? { id: batchDTO.productId } : null,
    });
    return result.id;
  }

  async find(filters: FindBatchDTO): Promise<{
    data: Lote[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<Lote> = {
      where: {
        ...(filters.code && { code: ILike(`%${filters.code}%`) }),
        ...(filters.expiresAt && {
          expiresAt: LessThanOrEqual(endOfDay(filters.expiresAt)),
        }),
        ...(filters.productId && { product: { id: filters.productId } }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
    };

    const [batches, totalItems] =
      await this.repository.findAndCount(queryOptions);

    const totalPages = filters.quantity
      ? Math.ceil(totalItems / filters.quantity)
      : 1;
    const currentPage = filters.page || 1;
    return { data: batches, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<Lote | undefined> {
    const batch = await this.repository.findOne({ where: { id: id } });
    if (!batch) {
      throw new NotFoundException({ message: 'Lote não encontrado' });
    }
    return batch;
  }

  async update(Id: number, batchDTO: UpdateBatchDTO): Promise<Lote> {
    const batch = await this.repository.findOne({ where: { id: Id } });

    const UpdateBatch = await this.repository.save({
      ...batch,
      ...batchDTO,
    });

    return UpdateBatch;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
