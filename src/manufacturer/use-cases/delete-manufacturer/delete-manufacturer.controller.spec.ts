import {
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { DeleteManufacturerController } from './delete-manufacturer.controller';

describe('DeleteManufacturerController', () => {
  let controller: DeleteManufacturerController;
  let mockUseCase: any;

  beforeEach(() => {
    mockUseCase = {
      delete: jest.fn(),
    };

    controller = new DeleteManufacturerController(mockUseCase);
  });

  it('deve excluir o fabricante e retornar mensagem de sucesso', async () => {
    const id = 1;
    mockUseCase.delete.mockResolvedValue(undefined);

    const result = await controller.delete(id);

    expect(result).toBe('Fabricante removido com sucesso');
    expect(mockUseCase.delete).toHaveBeenCalledWith(id);
  });

  it('deve lançar NotAcceptableException se o ID não for numérico', async () => {
    await expect(controller.delete(NaN)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.delete).not.toHaveBeenCalled();
  });

  it('deve propagar NotFoundException do use case', async () => {
    mockUseCase.delete.mockRejectedValue(new NotFoundException());

    await expect(controller.delete(999)).rejects.toThrow(NotFoundException);
    expect(mockUseCase.delete).toHaveBeenCalledWith(999);
  });

  it('deve propagar InternalServerErrorException do use case', async () => {
    mockUseCase.delete.mockRejectedValue(new InternalServerErrorException());

    await expect(controller.delete(5)).rejects.toThrow(
      InternalServerErrorException,
    );
    expect(mockUseCase.delete).toHaveBeenCalledWith(5);
  });
});
