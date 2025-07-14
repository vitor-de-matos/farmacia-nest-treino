import { CreateManufacturerController } from './create-manufacturer.controller';
import { CreateManufacturerDTO } from 'src/manufacturer/models/dtos/create-manufacturer.dto';
import {
  InternalServerErrorException,
  NotAcceptableException,
  BadRequestException,
} from '@nestjs/common';

describe('CreateManufacturerController', () => {
  let controller: CreateManufacturerController;
  let mockUseCase: any;

  beforeEach(() => {
    mockUseCase = {
      create: jest.fn(),
    };

    controller = new CreateManufacturerController(mockUseCase);
  });

  const validDTO: CreateManufacturerDTO = {
    name: 'Fabricante X',
    cnpj: '12345678000199',
    contact: '11999999999',
  };

  it('deve criar um fabricante e retornar o ID', async () => {
    mockUseCase.create.mockResolvedValue(1);

    const result = await controller.create(validDTO);

    expect(result).toBe(1);
    expect(mockUseCase.create).toHaveBeenCalledWith(validDTO);
  });

  it('deve lançar NotAcceptableException se o CNPJ não tiver 14 dígitos', async () => {
    const invalidDTO = { ...validDTO, cnpj: '12345' };

    await expect(controller.create(invalidDTO)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.create).not.toHaveBeenCalled();
  });

  it('deve propagar BadRequestException do use case', async () => {
    mockUseCase.create.mockRejectedValue(new BadRequestException());

    await expect(controller.create(validDTO)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('deve propagar InternalServerErrorException do use case', async () => {
    mockUseCase.create.mockRejectedValue(new InternalServerErrorException());

    await expect(controller.create(validDTO)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
