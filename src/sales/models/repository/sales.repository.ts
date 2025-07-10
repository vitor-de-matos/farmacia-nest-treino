import { Injectable, NotFoundException } from '@nestjs/common';
import { endOfDay, startOfDay } from 'date-fns';
import { InjectRepository } from '@nestjs/typeorm';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { CreateSalesDTO } from '../dtos/create-sales.dto';
import { UpdateSalesDTO } from '../dtos/update-sales.dto';
import { FindSalesDTO } from '../dtos/find-sales.dto';
import { ISalesRepo } from '../interface/sales-repo.interface';
import { Venda } from '../entity/sales.entity';
import {
  LessThanOrEqual,
  MoreThanOrEqual,
  FindManyOptions,
  Repository,
  Between,
  ILike,
} from 'typeorm';

@Injectable()
export class SalesRepository implements ISalesRepo {
  constructor(
    @InjectRepository(Venda, DB_PG_DATABASE)
    private readonly repository: Repository<Venda>,
  ) {}

  async create(salesDTO: CreateSalesDTO): Promise<number> {
    const result = await this.repository.save({
      ...salesDTO,
      employee: salesDTO.employeeId ? { id: salesDTO.employeeId } : null,
      customer: salesDTO.customerId ? { id: salesDTO.customerId } : null,
    });
    return result.id;
  }

  async find(filters: FindSalesDTO): Promise<{
    data: Venda[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<Venda> = {
      where: {
        ...(filters.cpf && {
          cpf: ILike(`%${filters.cpf}%`),
        }),
        ...(filters.customerId && { customer: { id: filters.customerId } }),
        ...(filters.employeeId && { employee: { id: filters.employeeId } }),
        ...((filters.emissionDateStart &&
          filters.emissionDateEnd && {
            emissionDate: Between(
              startOfDay(filters.emissionDateStart),
              endOfDay(filters.emissionDateEnd),
            ),
          }) ||
          (filters.emissionDateStart && {
            emissionDate: MoreThanOrEqual(
              startOfDay(filters.emissionDateStart),
            ),
          }) ||
          (filters.emissionDateEnd && {
            emissionDate: LessThanOrEqual(endOfDay(filters.emissionDateEnd)),
          })),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
      relations: {
        employee: true,
        customer: true,
        payments: true,
        itemSale: true,
      },
    };

    const [sales, totalItems] =
      await this.repository.findAndCount(queryOptions);

    const totalPages = filters.quantity
      ? Math.ceil(totalItems / filters.quantity)
      : 1;
    const currentPage = filters.page || 1;
    return { data: sales, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<Venda | undefined> {
    const sales = await this.repository.findOne({
      where: { id: id },
      relations: {
        employee: true,
        customer: true,
        itemSale: true,
        payments: true,
      },
    });
    if (!sales) {
      throw new NotFoundException({ message: 'Venda não encontrada' });
    }
    return sales;
  }

  async update(Id: number, salesDTO: UpdateSalesDTO): Promise<Venda> {
    const sales = await this.repository.findOne({ where: { id: Id } });

    const UpdateSales = await this.repository.save({
      ...sales,
      ...salesDTO,
    });

    return UpdateSales;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
