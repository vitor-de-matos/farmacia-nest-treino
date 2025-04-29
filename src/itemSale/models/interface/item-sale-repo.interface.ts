import { CreateItemSaleDTO } from '../dtos/create-item-sale.dto';
import { UpdateItemSaleDTO } from '../dtos/update-item-sale.dto';
import { FindItemSaleDTO } from '../dtos/find-item-sale.dto';
import { ItemVenda } from '../entity/item-sale.entity';

export interface IItemSaleRepo {
  create(itemSaleDTO: CreateItemSaleDTO): Promise<number>;
  find(filters: FindItemSaleDTO): Promise<{
    data: ItemVenda[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<ItemVenda | undefined>;
  update(id: number, itemSaleDTO: UpdateItemSaleDTO): Promise<ItemVenda>;
  delete(id: number): Promise<void>;
}
