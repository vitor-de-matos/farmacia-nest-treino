import { Fabricante } from 'src/manufacturer/models/entity/manufacturer.entity';
import { FindManufacturerUseCase } from './find-manufacturer.use-case';
import { NotFoundException } from '@nestjs/common';

describe('FindManufacturerUseCase', () => {
  let useCase: FindManufacturerUseCase;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
    };

    useCase = new FindManufacturerUseCase(mockRepository);
  });

  it('deve retornar um fabricante pelo ID', async () => {
    const fabricante: Fabricante = {
      id: 1,
      name: 'Fiat',
      cnpj: '123456789',
      contact: 'contato@fiat.com',
      products: [],
    };

    mockRepository.findById.mockResolvedValue(fabricante);

    const result = await useCase.find(1);

    expect(result).toEqual(fabricante);
    expect(mockRepository.findById).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotFoundException se o fabricante não for encontrado', async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(useCase.find(99)).rejects.toThrow(NotFoundException);
    expect(mockRepository.findById).toHaveBeenCalledWith(99);
  });
});
