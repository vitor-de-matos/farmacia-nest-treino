import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPersonRepo } from 'src/person/models/interface/person-repo.interface';

@Injectable()
export class DeletePersonUseCase {
  constructor(
    @Inject('IPersonRepo')
    private readonly personRepository: IPersonRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const person = await this.personRepository.findById(id);

    if (!person) {
      throw new NotFoundException({
        message: 'Pessoa não encontrada',
      });
    }

    await this.personRepository.delete(id);
  }
}
