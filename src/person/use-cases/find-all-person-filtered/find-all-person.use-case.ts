import { Inject, Injectable } from '@nestjs/common';
import { FindPersonDTO } from 'src/person/models/dtos/find-person.dto';
import { IPersonRepo } from 'src/person/models/interface/person-repo.interface';
import { Pessoa } from 'src/person/models/entity/person.entity';

@Injectable()
export class FindAllPersonUseCase {
  constructor(
    @Inject('IPersonRepo')
    private readonly personRepository: IPersonRepo,
  ) {}

  async find(personDTO: FindPersonDTO): Promise<{
    data: Pessoa[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.personRepository.find(personDTO);
  }
}
