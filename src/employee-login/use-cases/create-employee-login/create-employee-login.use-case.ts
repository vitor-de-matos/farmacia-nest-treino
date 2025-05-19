import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateEmployeeLoginDTO } from 'src/employee-login/models/dtos/create-employee-login.dto';
import { IEmployeeLoginRepo } from 'src/employee-login/models/interface/employee-login.interface';

@Injectable()
export class CreateEmployeeLoginUseCase {
  constructor(
    @Inject('IEmployeeLoginRepo')
    private readonly personRepository: IEmployeeLoginRepo,
  ) {}

  async create(personDTO: CreateEmployeeLoginDTO): Promise<number> {
    const personCreated = await this.personRepository.create(personDTO);
    if (isNaN(personCreated)) {
      throw new BadRequestException({
        message: 'Resposta invalida; entre em contato com o suporte',
      });
    }
    return personCreated;
  }
}
