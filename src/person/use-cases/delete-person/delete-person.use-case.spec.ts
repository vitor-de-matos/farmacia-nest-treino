import { IPersonRepo } from 'src/person/models/interface/person-repo.interface';
import { DeletePersonUseCase } from './delete-person.use-case';
import { NotFoundException } from '@nestjs/common';
import { TipoPessoa } from 'src/person/models/entity/person.entity';

describe('DeletePersonUseCase', () => {
  let useCase: DeletePersonUseCase;
  let mockRepo: jest.Mocked<IPersonRepo>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<IPersonRepo>;

    useCase = new DeletePersonUseCase(mockRepo);
  });

  it('deve deletar uma pessoa existente com sucesso', async () => {
    const id = 1;
    const mockPerson = {
      id,
      name: 'João',
      type: TipoPessoa.CLIENTE,
      receivesDiscount: false,
      createdAt: null,
      updatedAt: null,
      buys: null,
      sales: null,
    };

    mockRepo.findById.mockResolvedValue(mockPerson);
    mockRepo.delete.mockResolvedValue(undefined);

    await expect(useCase.delete(id)).resolves.toBeUndefined();
    expect(mockRepo.findById).toHaveBeenCalledWith(id);
    expect(mockRepo.delete).toHaveBeenCalledWith(id);
  });

  it('deve lançar NotFoundException se a pessoa não for encontrada', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.delete(999)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(999);
    expect(mockRepo.delete).not.toHaveBeenCalled();
  });
});
