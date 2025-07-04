import { IPersonRepo } from 'src/person/models/interface/person-repo.interface';
import { FindPersonUseCase } from './find-person.use-case';
import { Pessoa } from 'src/person/models/entity/person.entity';
import { NotFoundException } from '@nestjs/common';

describe('FindPersonUseCase', () => {
  let useCase: FindPersonUseCase;
  let mockRepo: jest.Mocked<IPersonRepo>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
    } as unknown as jest.Mocked<IPersonRepo>;

    useCase = new FindPersonUseCase(mockRepo);
  });

  it('deve retornar uma pessoa existente', async () => {
    const person: Pessoa = { id: 1, name: 'João' } as Pessoa;

    mockRepo.findById.mockResolvedValue(person);

    const result = await useCase.find(1);

    expect(result).toEqual(person);
    expect(mockRepo.findById).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotFoundException se a pessoa não for encontrada', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.find(999)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(999);
  });
});
