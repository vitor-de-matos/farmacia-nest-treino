import { UpdateManufacturerController } from './update-manufacturer.controller';
import { UpdateManufacturerDTO } from 'src/manufacturer/models/dtos/update-manufacturer.dto';
import { Fabricante } from 'src/manufacturer/models/entity/manufacturer.entity';
import {
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

describe('UpdateManufacturerController', () => {
  let controller: UpdateManufacturerController;
  let mockUseCase: any;

  beforeEach(() => {
    mockUseCase = {
      update: jest.fn(),
    };

    controller = new UpdateManufacturerController(mockUseCase);
  });

  it('deve atualizar um fabricante com sucesso', async () => {
    const dto: UpdateManufacturerDTO = {
      name: 'Fiat Atualizado',
      cnpj: '987654321',
      contact: 'novo@fiat.com',
    };

    const updated: Fabricante = {
      id: 1,
      name: dto.name ?? '',
      cnpj: dto.cnpj ?? '',
      contact: dto.contact ?? '',
      products: [],
    };

    mockUseCase.update.mockResolvedValue(updated);

    const result = await controller.update(1, dto);

    expect(result).toEqual(updated);
    expect(mockUseCase.update).toHaveBeenCalledWith(1, dto);
  });

  it('deve lançar NotFoundException se o fabricante não for encontrado', async () => {
    const dto: UpdateManufacturerDTO = {
      name: 'Qualquer',
      cnpj: '000',
      contact: '',
    };

    mockUseCase.update.mockRejectedValue(new NotFoundException());

    await expect(controller.update(999, dto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('deve lançar InternalServerErrorException em falha interna', async () => {
    const dto: UpdateManufacturerDTO = {
      name: 'Erro',
      cnpj: '000',
      contact: '',
    };

    mockUseCase.update.mockRejectedValue(new InternalServerErrorException());

    await expect(controller.update(1, dto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('deve lançar NotAcceptableException se o ID não for numérico', async () => {
    const dto: UpdateManufacturerDTO = {
      name: 'Teste',
      cnpj: '123',
      contact: 'contato@exemplo.com',
    };

    await expect(controller.update('abc' as any, dto)).rejects.toThrow(
      NotAcceptableException,
    );
  });
});
