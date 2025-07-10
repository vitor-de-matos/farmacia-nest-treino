import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateEmployeeLoginDTO } from 'src/employee-login/models/dtos/create-employee-login.dto';
import { IEmployeeLoginRepo } from 'src/employee-login/models/interface/employee-login-repo.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateEmployeeLoginUseCase {
  constructor(
    @Inject('IEmployeeLoginRepo')
    private readonly employeeRepository: IEmployeeLoginRepo,
  ) {}

  async create(employeeDTO: CreateEmployeeLoginDTO): Promise<number> {
    const employeeLogin = await this.employeeRepository.find({
      personId: employeeDTO.personId,
    });

    if (employeeLogin.data?.length) {
      throw new BadRequestException({ message: 'Pessoa ja possui login' });
    }
    const hashedPassword = await bcrypt.hash(employeeDTO.password, 14);
    employeeDTO.password = hashedPassword;

    const employeeCreated = await this.employeeRepository.create(employeeDTO);

    if (isNaN(employeeCreated)) {
      throw new BadRequestException({
        message: 'Resposta invalida; entre em contato com o suporte',
      });
    }
    return employeeCreated;
  }
}
