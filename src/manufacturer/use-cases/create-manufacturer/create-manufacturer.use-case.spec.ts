import { CreateManufacturerUseCase } from './create-manufacturer.use-case';
import { CreateManufacturerDTO } from 'src/manufacturer/models/dtos/create-manufacturer.dto';
import { BadRequestException } from '@nestjs/common';

describe('CreateManufacturerUseCase', () => {
  let useCase: CreateManufacturerUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
    };

    useCase = new CreateManufacturerUseCase(mockRepo);
  });

  const dto: CreateManufacturerDTO = {
    name: 'Nestle',
    cnpj: '12345678000199',
    contact: '11999999999',
  };

  it('deve criar o fabricante e retornar o ID', async () => {
    mockRepo.create.mockResolvedValue(42);

    const result = await useCase.create(dto);

    expect(result).toBe(42);
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
  });

  it('deve lançar BadRequestException se o ID retornado for inválido', async () => {
    mockRepo.create.mockResolvedValue(NaN);

    await expect(useCase.create(dto)).rejects.toThrow(BadRequestException);
  });
});
