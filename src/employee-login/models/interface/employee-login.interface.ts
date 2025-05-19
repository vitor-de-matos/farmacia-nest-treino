import { CreateEmployeeLoginDTO } from '../dtos/create-employee-login.dto';
import { FindEmployeeLoginDTO } from '../dtos/find-employee-login.dto';
import { UpdateEmployeeLoginDTO } from '../dtos/update-employee-login.dto';
import { FuncionarioLogin } from '../entity/employee-login.entity';

export interface IEmployeeLoginRepo {
  create(employeeLoginDTO: CreateEmployeeLoginDTO): Promise<number>;
  find(filters: FindEmployeeLoginDTO): Promise<{
    data: FuncionarioLogin[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<FuncionarioLogin | undefined>;
  update(
    id: number,
    employeeLoginDTO: UpdateEmployeeLoginDTO,
  ): Promise<FuncionarioLogin>;
  delete(id: number): Promise<void>;
}
