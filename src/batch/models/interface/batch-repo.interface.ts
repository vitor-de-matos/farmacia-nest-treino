import { CreateBatchDTO } from '../dtos/create-batch.dto';
import { UpdateBatchDTO } from '../dtos/update-batch.dto';
import { FindBatchDTO } from '../dtos/find-batch.dto';
import { Lote } from '../entity/batch.entity';

export interface IBatchRepo {
  create(batchDTO: CreateBatchDTO): Promise<number>;
  find(filters: FindBatchDTO): Promise<{
    data: Lote[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<Lote | undefined>;
  update(id: number, batchDTO: UpdateBatchDTO): Promise<Lote>;
  delete(id: number): Promise<void>;
}
