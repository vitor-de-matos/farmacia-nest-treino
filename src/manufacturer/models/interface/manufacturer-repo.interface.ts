import { CreateManufacturerDTO } from '../dtos/create-manufacturer.dto';
import { UpdateManufacturerDTO } from '../dtos/update-manufacturer.dto';
import { FindManufacturerDTO } from '../dtos/find-manufacturer.dto';
import { Fabricante } from '../entity/manufacturer.entity';

export interface IManufacturerRepo {
  create(batchDTO: CreateManufacturerDTO): Promise<number>;
  find(filters: FindManufacturerDTO): Promise<{
    data: Fabricante[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<Fabricante | undefined>;
  update(id: number, batchDTO: UpdateManufacturerDTO): Promise<Fabricante>;
  delete(id: number): Promise<void>;
}
