import { UpdatePersonDTO } from 'src/person/models/dtos/update-person.dto';
import { IPersonRepo } from 'src/person/models/interface/person-repo.interface';
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UpdatePersonUseCase {
  constructor(
    @Inject('IPersonRepo')
    private readonly personRepository: IPersonRepo,
  ) {}

  async update(personId: number, personDTO: UpdatePersonDTO, req: Request) {
    const person = await this.personRepository.findById(personId);
    if (!person) {
      throw new NotFoundException({
        message: 'Pessoa não encontrada',
      });
    }

    if (personDTO.type !== undefined && req.user['permissions'] !== 1) {
      throw new UnauthorizedException({
        message: 'Apenas administradores podem alterar o tipo de pessoa',
      });
    }

    const updated = await this.personRepository.update(personId, personDTO);

    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar entre em contato com o suporte',
      });
    }

    return updated;
  }
}
