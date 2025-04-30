import { FindManyOptions, ILike, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateManufacturerDTO } from '../dtos/update-manufacturer.dto';
import { CreateManufacturerDTO } from '../dtos/create-manufacturer.dto';
import { FindManufacturerDTO } from '../dtos/find-manufacturer.dto';
import { IManufacturerRepo } from '../interface/manufacturer-repo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { Fabricante } from '../entity/manufacturer.entity';

@Injectable()
export class manufacturerRepository implements IManufacturerRepo {
  constructor(
    @InjectRepository(Fabricante, DB_PG_DATABASE)
    private readonly repository: Repository<Fabricante>,
  ) {}

  async create(manufacturerDTO: CreateManufacturerDTO): Promise<number> {
    const result = await this.repository.save(manufacturerDTO);
    return result.id;
  }

  async find(filters: FindManufacturerDTO): Promise<{
    data: Fabricante[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<Fabricante> = {
      where: {
        ...(filters.name && { name: ILike(`%${filters.name}%`) }),
        ...(filters.cnpj && { cnpj: ILike(`%${filters.cnpj}%`) }),
        ...(filters.contact && { contact: ILike(`%${filters.contact}%`) }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
    };

    const [manufactures, totalItems] =
      await this.repository.findAndCount(queryOptions);

    const totalPages = filters.quantity
      ? Math.ceil(totalItems / filters.quantity)
      : 1;
    const currentPage = filters.page || 1;
    return { data: manufactures, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<Fabricante | undefined> {
    const manufacturer = await this.repository.findOne({ where: { id: id } });
    if (!manufacturer) {
      throw new NotFoundException({ message: 'Lote não encontrado' });
    }
    return manufacturer;
  }

  async update(
    Id: number,
    manufacturerDTO: UpdateManufacturerDTO,
  ): Promise<Fabricante> {
    const manufacturer = await this.repository.findOne({ where: { id: Id } });

    const UpdateManufacturer = await this.repository.save({
      ...manufacturer,
      ...manufacturerDTO,
    });

    return UpdateManufacturer;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
