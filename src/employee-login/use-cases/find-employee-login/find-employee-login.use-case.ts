import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IEmployeeLoginRepo } from 'src/employee-login/models/interface/employee-login-repo.interface';
import { FuncionarioLogin } from 'src/employee-login/models/entity/employee-login.entity';

@Injectable()
export class FindEmployeeLoginUseCase {
  constructor(
    @Inject('IEmployeeLoginRepo')
    private readonly employeeLoginRepository: IEmployeeLoginRepo,
  ) {}

  async find(employeeLoginId: number): Promise<FuncionarioLogin> {
    const employeeLogin =
      await this.employeeLoginRepository.findById(employeeLoginId);
    if (!employeeLogin) {
      throw new NotFoundException({
        message: 'Login de funcionario não encontrado',
      });
    }
    return employeeLogin;
  }
}
