import { CreateStockDTO } from '../dtos/create-stock.dto';
import { UpdateStockDTO } from '../dtos/update-stock.dto';
import { FindStockDTO } from '../dtos/find-stock.dto';
import { Estoque } from '../entity/stock.entity';

export interface IStockRepo {
  create(stockDTO: CreateStockDTO): Promise<number>;
  find(filters: FindStockDTO): Promise<{
    data: Estoque[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<Estoque | undefined>;
  update(id: number, stockDTO: UpdateStockDTO): Promise<Estoque>;
  delete(id: number): Promise<void>;
}
