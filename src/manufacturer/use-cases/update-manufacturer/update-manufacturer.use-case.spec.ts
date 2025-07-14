import { UpdateManufacturerUseCase } from './update-manufacturer.use-case';
import { UpdateManufacturerDTO } from 'src/manufacturer/models/dtos/update-manufacturer.dto';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('UpdateManufacturerUseCase', () => {
  let useCase: UpdateManufacturerUseCase;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    };

    useCase = new UpdateManufacturerUseCase(mockRepository);
  });

  it('deve atualizar um fabricante com sucesso', async () => {
    const dto: UpdateManufacturerDTO = {
      name: 'Fiat Atualizado',
      cnpj: '987654321',
      contact: 'novo@fiat.com',
    };

    const fabricanteExistente = { id: 1 };

    const fabricanteAtualizado = {
      id: 1,
      ...dto,
      products: [],
    };

    mockRepository.findById.mockResolvedValue(fabricanteExistente);
    mockRepository.update.mockResolvedValue(fabricanteAtualizado);

    const result = await useCase.update(1, dto);

    expect(result).toEqual(fabricanteAtualizado);
    expect(mockRepository.findById).toHaveBeenCalledWith(1);
    expect(mockRepository.update).toHaveBeenCalledWith(1, dto);
  });

  it('deve lançar NotFoundException se o fabricante não existir', async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(
      useCase.update(1, {} as UpdateManufacturerDTO),
    ).rejects.toThrow(NotFoundException);
  });

  it('deve lançar InternalServerErrorException se a atualização falhar', async () => {
    const dto: UpdateManufacturerDTO = {
      name: 'Teste',
      cnpj: '000',
      contact: 'email@test.com',
    };

    mockRepository.findById.mockResolvedValue({ id: 1 });
    mockRepository.update.mockResolvedValue(null);

    await expect(useCase.update(1, dto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
