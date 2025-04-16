import { CreateMidiaDTO } from '../dtos/create-midia.dto';
import { UpdateMidiaDTO } from '../dtos/update-midia.dto';
import { FindMidiaDTO } from '../dtos/find-midia.dto';
import { Midia } from '../entity/midia.entity';

export interface IMidiaRepo {
  create(mediaDTO: CreateMidiaDTO): Promise<number>;
  find(filters: FindMidiaDTO): Promise<{
    data: Midia[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<Midia | undefined>;
  update(id: number, mediaDTO: UpdateMidiaDTO): Promise<Midia>;
  delete(id: number): Promise<void>;
}
