import { FindManyOptions, ILike, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeLoginDTO } from '../dtos/create-employee-login.dto';
import { UpdateEmployeeLoginDTO } from '../dtos/update-employee-login.dto';
import { FindEmployeeLoginDTO } from '../dtos/find-employee-login.dto';
import { IEmployeeLoginRepo } from '../interface/employee-login.interface';
import { FuncionarioLogin } from '../entity/employee-login.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';

@Injectable()
export class EmployeeLoginRepository implements IEmployeeLoginRepo {
  constructor(
    @InjectRepository(FuncionarioLogin, DB_PG_DATABASE)
    private readonly repository: Repository<FuncionarioLogin>,
  ) {}

  async create(employeeLoginDTO: CreateEmployeeLoginDTO): Promise<number> {
    const result = await this.repository.save(employeeLoginDTO);
    return result.id;
  }

  async find(filters: FindEmployeeLoginDTO): Promise<{
    data: FuncionarioLogin[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<FuncionarioLogin> = {
      where: {
        ...(filters.login && { login: ILike(`%${filters.login}%`) }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
    };

    const [employeeLogin, totalItems] =
      await this.repository.findAndCount(queryOptions);

    const totalPages = filters.quantity
      ? Math.ceil(totalItems / filters.quantity)
      : 1;
    const currentPage = filters.page || 1;
    return { data: employeeLogin, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<FuncionarioLogin | undefined> {
    const empoyeeLogin = await this.repository.findOne({ where: { id: id } });
    if (!empoyeeLogin) {
      throw new NotFoundException({ message: 'Lote não encontrado' });
    }
    return empoyeeLogin;
  }

  async update(
    Id: number,
    employeeLoginDTO: UpdateEmployeeLoginDTO,
  ): Promise<FuncionarioLogin> {
    const employeeLogin = await this.repository.findOne({ where: { id: Id } });

    const updateEmployeeLogin = await this.repository.save({
      ...employeeLogin,
      ...employeeLoginDTO,
    });

    return updateEmployeeLogin;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
