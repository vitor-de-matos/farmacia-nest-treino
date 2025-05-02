import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPersonRepo } from 'src/person/models/interface/person-repo.interface';
import { Pessoa } from 'src/person/models/entity/person.entity';

@Injectable()
export class FindPersonUseCase {
  constructor(
    @Inject('IPersonRepo')
    private readonly personRepository: IPersonRepo,
  ) {}

  async find(personId: number): Promise<Pessoa> {
    const person = await this.personRepository.findById(personId);
    if (!person) {
      throw new NotFoundException({
        message: 'Pessoa não encontrada',
      });
    }
    return person;
  }
}
