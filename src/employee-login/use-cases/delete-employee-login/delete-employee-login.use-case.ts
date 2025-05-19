import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IEmployeeLoginRepo } from 'src/employee-login/models/interface/employee-login.interface';

@Injectable()
export class DeleteEmployeeLoginUseCase {
  constructor(
    @Inject('IEmployeeLoginRepo')
    private readonly personRepository: IEmployeeLoginRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const employeeLogin = await this.personRepository.findById(id);

    if (!employeeLogin) {
      throw new NotFoundException({
        message: 'Login do funcionario não encontrado',
      });
    }

    await this.personRepository.delete(id);
  }
}
