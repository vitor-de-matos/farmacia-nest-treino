import { CreateSalesDTO } from '../dtos/create-sales.dto';
import { UpdateSalesDTO } from '../dtos/update-sales.dto';
import { FindSalesDTO } from '../dtos/find-sales.dto';
import { Venda } from '../entity/sales.entity';

export interface ISalesRepo {
  create(salesDTO: CreateSalesDTO): Promise<number>;
  find(filters: FindSalesDTO): Promise<{
    data: Venda[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<Venda | undefined>;
  update(id: number, salesDTO: UpdateSalesDTO): Promise<Venda>;
  delete(id: number): Promise<void>;
}
