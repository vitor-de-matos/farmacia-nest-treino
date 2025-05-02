import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreatePersonDTO } from 'src/person/models/dtos/create-person.dto';
import { IPersonRepo } from 'src/person/models/interface/person-repo.interface';

@Injectable()
export class CreatePersonUseCase {
  constructor(
    @Inject('IPersonRepo')
    private readonly personRepository: IPersonRepo,
  ) {}

  async create(personDTO: CreatePersonDTO): Promise<number> {
    const personCreated = await this.personRepository.create(personDTO);
    if (isNaN(personCreated)) {
      throw new BadRequestException({
        message: 'Resposta invalida; entre em contato com o suporte',
      });
    }
    return personCreated;
  }
}
