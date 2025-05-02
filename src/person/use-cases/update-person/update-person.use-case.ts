import { UpdatePersonDTO } from 'src/person/models/dtos/update-person.dto';
import { IPersonRepo } from 'src/person/models/interface/person-repo.interface';
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class UpdatePersonUseCase {
  constructor(
    @Inject('IPersonRepo')
    private readonly personRepository: IPersonRepo,
  ) {}

  async update(personId: number, personDTO: UpdatePersonDTO) {
    const person = await this.personRepository.findById(personId);
    if (!person) {
      throw new NotFoundException({
        message: 'Pessoa não encontrada',
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
