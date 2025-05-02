import { CreatePersonDTO } from '../dtos/create-person.dto';
import { UpdatePersonDTO } from '../dtos/update-person.dto';
import { FindPersonDTO } from '../dtos/find-person.dto';
import { Pessoa } from '../entity/person.entity';

export interface IPersonRepo {
  create(personDTO: CreatePersonDTO): Promise<number>;
  find(filters: FindPersonDTO): Promise<{
    data: Pessoa[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<Pessoa | undefined>;
  update(id: number, personDTO: UpdatePersonDTO): Promise<Pessoa>;
  delete(id: number): Promise<void>;
}
