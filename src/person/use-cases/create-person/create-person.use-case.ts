import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePersonDTO } from 'src/person/models/dtos/create-person.dto';
import { TipoPessoa } from 'src/person/models/entity/person.entity';
import { IPersonRepo } from 'src/person/models/interface/person-repo.interface';
import { Request } from 'express';

@Injectable()
export class CreatePersonUseCase {
  constructor(
    @Inject('IPersonRepo')
    private readonly personRepository: IPersonRepo,
  ) {}

  async create(personDTO: CreatePersonDTO, req: Request): Promise<number> {
    if (
      personDTO.type === TipoPessoa.FUNCIONARIO &&
      req.user['permissions'] !== 1
    ) {
      throw new UnauthorizedException({
        message: 'Apenas administradores podem cadastrar um funcionario',
      });
    }

    const personCreated = await this.personRepository.create(personDTO);

    if (isNaN(personCreated)) {
      throw new BadRequestException({
        message: 'Resposta invalida; entre em contato com o suporte',
      });
    }
    return personCreated;
  }
}
