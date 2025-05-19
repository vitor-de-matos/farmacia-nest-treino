import { Injectable, NotFoundException } from '@nestjs/common';
import { endOfDay, startOfDay } from 'date-fns';
import { InjectRepository } from '@nestjs/typeorm';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { CreateStockDTO } from '../dtos/create-stock.dto';
import { UpdateStockDTO } from '../dtos/update-stock.dto';
import { FindStockDTO } from '../dtos/find-stock.dto';
import { IStockRepo } from '../interface/stock-repo.interface';
import { Estoque } from '../entity/stock.entity';
import {
  FindManyOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
  Between,
} from 'typeorm';

@Injectable()
export class StockRepository implements IStockRepo {
  constructor(
    @InjectRepository(Estoque, DB_PG_DATABASE)
    private readonly repository: Repository<Estoque>,
  ) {}

  async create(stockDTO: CreateStockDTO): Promise<number> {
    const result = await this.repository.save(stockDTO);
    return result.id;
  }

  async find(filters: FindStockDTO): Promise<{
    data: Estoque[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<Estoque> = {
      where: {
        ...(filters.movementType && { movementType: filters.movementType }),
        ...(filters.batchId && { batch: { id: filters.batchId } }),
        ...((filters.movementDateStart &&
          filters.movementDateEnd && {
            movementDate: Between(
              startOfDay(filters.movementDateStart),
              endOfDay(filters.movementDateEnd),
            ),
          }) ||
          (filters.movementDateStart && {
            movementDate: MoreThanOrEqual(
              startOfDay(filters.movementDateStart),
            ),
          }) ||
          (filters.movementDateEnd && {
            movementDate: LessThanOrEqual(endOfDay(filters.movementDateEnd)),
          })),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
    };

    const [stock, totalItems] =
      await this.repository.findAndCount(queryOptions);

    const totalPages = filters.quantity
      ? Math.ceil(totalItems / filters.quantity)
      : 1;
    const currentPage = filters.page || 1;
    return { data: stock, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<Estoque | undefined> {
    const stock = await this.repository.findOne({ where: { id: id } });
    if (!stock) {
      throw new NotFoundException({ message: 'Estoque não encontrado' });
    }
    return stock;
  }

  async update(Id: number, stockDTO: UpdateStockDTO): Promise<Estoque> {
    const stock = await this.repository.findOne({ where: { id: Id } });

    const updateStock = await this.repository.save({
      ...stock,
      ...stockDTO,
    });

    return updateStock;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
