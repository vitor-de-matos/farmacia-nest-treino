import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { FindManufacturerController } from './find-manufacturer.controller';
import { Fabricante } from 'src/manufacturer/models/entity/manufacturer.entity';

describe('FindManufacturerController', () => {
  let controller: FindManufacturerController;
  let mockUseCase: any;

  beforeEach(() => {
    mockUseCase = {
      find: jest.fn(),
    };

    controller = new FindManufacturerController(mockUseCase);
  });

  it('deve retornar um fabricante pelo ID', async () => {
    const fabricante: Fabricante = {
      id: 1,
      name: 'Fiat',
      cnpj: '123456789',
      contact: 'contato@fiat.com',
      products: [],
    };

    mockUseCase.find.mockResolvedValue(fabricante);

    const result = await controller.find(1);

    expect(result).toEqual(fabricante);
    expect(mockUseCase.find).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotFoundException se o fabricante não existir', async () => {
    mockUseCase.find.mockRejectedValue(
      new NotFoundException('Fabricante não encontrado'),
    );

    await expect(controller.find(999)).rejects.toThrow(NotFoundException);
    expect(mockUseCase.find).toHaveBeenCalledWith(999);
  });

  it('deve lançar NotAcceptableException se o ID não for numérico', async () => {
    await expect(controller.find('a' as any)).rejects.toThrow(
      NotAcceptableException,
    );
  });
});
