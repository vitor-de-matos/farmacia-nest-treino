import { IPersonRepo } from 'src/person/models/interface/person-repo.interface';
import { UpdatePersonUseCase } from './update-person.use-case';
import { UpdatePersonDTO } from 'src/person/models/dtos/update-person.dto';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TipoPessoa } from 'src/person/models/entity/person.entity';

describe('UpdatePersonUseCase', () => {
  let useCase: UpdatePersonUseCase;
  let mockRepo: jest.Mocked<IPersonRepo>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<IPersonRepo>;

    useCase = new UpdatePersonUseCase(mockRepo);
  });

  it('deve atualizar e retornar a pessoa atualizada', async () => {
    const personId = 1;
    const dto: UpdatePersonDTO = { name: 'João Atualizado' } as UpdatePersonDTO;
    const existingPerson = {
      id: personId,
      name: 'João',
      type: TipoPessoa.CLIENTE,
      receivesDiscount: false,
      createdAt: null,
      updatedAt: null,
      buys: null,
      sales: null,
    };
    const updatedPerson = {
      id: personId,
      name: 'João Atualizado',
      type: TipoPessoa.CLIENTE,
      receivesDiscount: true,
      createdAt: null,
      updatedAt: null,
      buys: null,
      sales: null,
    };

    mockRepo.findById.mockResolvedValue(existingPerson);
    mockRepo.update.mockResolvedValue(updatedPerson);

    const result = await useCase.update(personId, dto);

    expect(result).toEqual(updatedPerson);
    expect(mockRepo.findById).toHaveBeenCalledWith(personId);
    expect(mockRepo.update).toHaveBeenCalledWith(personId, dto);
  });

  it('deve lançar NotFoundException se a pessoa não existir', async () => {
    mockRepo.findById.mockResolvedValue(null);
    const dto: UpdatePersonDTO = { nome: 'Teste' } as UpdatePersonDTO;

    await expect(useCase.update(999, dto)).rejects.toThrow(NotFoundException);
    expect(mockRepo.update).not.toHaveBeenCalled();
  });

  it('deve lançar InternalServerErrorException se a atualização falhar', async () => {
    const personId = 1;
    const dto: UpdatePersonDTO = { name: 'Erro' } as UpdatePersonDTO;
    const existingPerson = {
      id: personId,
      name: 'João',
      type: TipoPessoa.CLIENTE,
      receivesDiscount: false,
      createdAt: null,
      updatedAt: null,
      buys: null,
      sales: null,
    };

    mockRepo.findById.mockResolvedValue(existingPerson);
    mockRepo.update.mockResolvedValue(null);

    await expect(useCase.update(personId, dto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
