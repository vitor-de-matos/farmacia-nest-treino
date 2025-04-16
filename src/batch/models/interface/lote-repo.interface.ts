import { CreateLoteDTO } from '../dtos/create-lote.dto';
import { FindLoteDTO } from '../dtos/find-lote.dto';
import { UpdateLoteDTO } from '../dtos/update-lote.dto';
import { Lote } from '../entity/batch.entity';

export interface IloteRepo {
  create(batchDTO: CreateLoteDTO): Promise<number>;
  find(filters: FindLoteDTO): Promise<{
    data: Lote[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<Lote | undefined>;
  update(id: number, batchDTO: UpdateLoteDTO): Promise<Lote>;
  delete(id: number): Promise<void>;
}
