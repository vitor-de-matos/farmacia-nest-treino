import { FindManyOptions, ILike, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePersonDTO } from '../dtos/update-person.dto';
import { CreatePersonDTO } from '../dtos/create-person.dto';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { FindPersonDTO } from '../dtos/find-person.dto';
import { IPersonRepo } from '../interface/person-repo.interface';
import { Pessoa } from '../entity/person.entity';

@Injectable()
export class PersonRepository implements IPersonRepo {
  constructor(
    @InjectRepository(Pessoa, DB_PG_DATABASE)
    private readonly repository: Repository<Pessoa>,
  ) {}

  async create(batchDTO: CreatePersonDTO): Promise<number> {
    const result = await this.repository.save(batchDTO);
    return result.id;
  }

  async find(filters: FindPersonDTO): Promise<{
    data: Pessoa[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<Pessoa> = {
      where: {
        ...(filters.name && { name: ILike(`%${filters.name}%`) }),
        ...(filters.document && { document: ILike(`%${filters.document}%`) }),
        ...(filters.telephone && {
          telephone: ILike(`%${filters.telephone}%`),
        }),
        ...(filters.email && { email: ILike(`%${filters.email}%`) }),
        ...(filters.type && { type: filters.type }),
        ...(filters.receivesDiscount && {
          receivesDiscount: filters.receivesDiscount,
        }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
    };

    const [person, totalItems] =
      await this.repository.findAndCount(queryOptions);

    const totalPages = filters.quantity
      ? Math.ceil(totalItems / filters.quantity)
      : 1;
    const currentPage = filters.page || 1;
    return { data: person, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<Pessoa | undefined> {
    const person = await this.repository.findOne({ where: { id: id } });
    if (!person) {
      throw new NotFoundException({ message: 'Lote não encontrado' });
    }
    return person;
  }

  async update(Id: number, personDTO: UpdatePersonDTO): Promise<Pessoa> {
    const person = await this.repository.findOne({ where: { id: Id } });

    const updatePerson = await this.repository.save({
      ...person,
      ...personDTO,
    });

    return updatePerson;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
