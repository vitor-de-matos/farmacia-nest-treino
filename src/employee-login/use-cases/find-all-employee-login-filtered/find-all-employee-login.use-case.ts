import { Inject, Injectable } from '@nestjs/common';
import { FindEmployeeLoginDTO } from 'src/employee-login/models/dtos/find-employee-login.dto';
import { FuncionarioLogin } from 'src/employee-login/models/entity/employee-login.entity';
import { IEmployeeLoginRepo } from 'src/employee-login/models/interface/employee-login.interface';

@Injectable()
export class FindAllEmployeeLoginUseCase {
  constructor(
    @Inject('IEmployeeLoginRepo')
    private readonly employeeLoginRepository: IEmployeeLoginRepo,
  ) {}

  async find(employeeLoginDTO: FindEmployeeLoginDTO): Promise<{
    data: FuncionarioLogin[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.employeeLoginRepository.find(employeeLoginDTO);
  }
}
