import { CreatePersonUseCase } from './create-person.use-case';
import { BadRequestException } from '@nestjs/common';
import { CreatePersonDTO } from 'src/person/models/dtos/create-person.dto';
import { IPersonRepo } from 'src/person/models/interface/person-repo.interface';
import { getMockReq } from '@jest-mock/express';

describe('CreatePersonUseCase', () => {
  let useCase: CreatePersonUseCase;
  let mockRepo: jest.Mocked<IPersonRepo>;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
    } as unknown as jest.Mocked<IPersonRepo>;

    useCase = new CreatePersonUseCase(mockRepo);
  });

  it('deve criar uma pessoa e retornar o ID', async () => {
    const dto: CreatePersonDTO = { name: 'João' } as CreatePersonDTO;
    mockRepo.create.mockResolvedValue(123);
    const mockRequest = getMockReq({ user: { id: 1 } });

    const result = await useCase.create(dto, mockRequest);

    expect(result).toBe(123);
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
  });

  it('deve lançar BadRequestException se o retorno não for um número', async () => {
    const dto: CreatePersonDTO = { name: 'Maria' } as CreatePersonDTO;
    mockRepo.create.mockResolvedValue(NaN);
    const mockRequest = getMockReq({ user: { id: 1 } });

    await expect(useCase.create(dto, mockRequest)).rejects.toThrow(
      BadRequestException,
    );
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
  });
});
