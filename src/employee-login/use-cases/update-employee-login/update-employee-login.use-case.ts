import { UpdateEmployeeLoginDTO } from 'src/employee-login/models/dtos/update-employee-login.dto';
import { IEmployeeLoginRepo } from 'src/employee-login/models/interface/employee-login.interface';
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class UpdateEmployeeLoginUseCase {
  constructor(
    @Inject('IEmployeeLoginRepo')
    private readonly employeeLoginRepository: IEmployeeLoginRepo,
  ) {}

  async update(employeeId: number, employeeDTO: UpdateEmployeeLoginDTO) {
    const employee = await this.employeeLoginRepository.findById(employeeId);
    if (!employee) {
      throw new NotFoundException({
        message: 'Login de funcionario não encontrado',
      });
    }

    const updated = await this.employeeLoginRepository.update(
      employeeId,
      employeeDTO,
    );

    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar entre em contato com o suporte',
      });
    }

    return updated;
  }
}
