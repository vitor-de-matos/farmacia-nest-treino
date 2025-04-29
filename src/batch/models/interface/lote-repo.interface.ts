import { CreateBatchDTO } from '../dtos/create-lote.dto';
import { UpdateBatchDTO } from '../dtos/update-lote.dto';
import { FindBatchDTO } from '../dtos/find-lote.dto';
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
