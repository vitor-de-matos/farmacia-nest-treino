import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateItemSaleDTO } from '../dtos/create-item-sale.dto';
import { UpdateItemSaleDTO } from '../dtos/update-item-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindItemSaleDTO } from '../dtos/find-item-sale.dto';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { IItemSaleRepo } from '../interface/item-sale-repo.interface';
import { ItemVenda } from '../entity/item-sale.entity';

@Injectable()
export class ItemSaleRepository implements IItemSaleRepo {
  constructor(
    @InjectRepository(ItemVenda, DB_PG_DATABASE)
    private readonly repository: Repository<ItemVenda>,
  ) {}

  async create(itemSaleDTO: CreateItemSaleDTO): Promise<number> {
    const result = await this.repository.save({
      ...itemSaleDTO,
      product: itemSaleDTO.productId ? { id: itemSaleDTO.productId } : null,
      sale: itemSaleDTO.saleId ? { id: itemSaleDTO.saleId } : null,
      batch: itemSaleDTO.batchId ? { id: itemSaleDTO.batchId } : null,
    });
    return result.id;
  }

  async find(filters: FindItemSaleDTO): Promise<{
    data: ItemVenda[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<ItemVenda> = {
      where: {
        ...(filters.productId && { product: { id: filters.productId } }),
        ...(filters.batchId && { batch: { id: filters.batchId } }),
        ...(filters.saleId && { sale: { id: filters.saleId } }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
    };

    const [itemSale, totalItems] =
      await this.repository.findAndCount(queryOptions);

    const totalPages = filters.quantity
      ? Math.ceil(totalItems / filters.quantity)
      : 1;
    const currentPage = filters.page || 1;
    return { data: itemSale, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<ItemVenda | undefined> {
    const batch = await this.repository.findOne({ where: { id: id } });
    if (!batch) {
      throw new NotFoundException({ message: 'Item da venda não encontrado' });
    }
    return batch;
  }

  async update(Id: number, itemSaleDTO: UpdateItemSaleDTO): Promise<ItemVenda> {
    const itemSale = await this.repository.findOne({ where: { id: Id } });

    const UpdateItemSale = await this.repository.save({
      ...itemSale,
      ...itemSaleDTO,
    });

    return UpdateItemSale;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
