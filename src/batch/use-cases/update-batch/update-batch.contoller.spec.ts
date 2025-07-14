import { UpdateBatchController } from './update-batch.controller';
import { UpdateBatchUseCase } from './update-batch.use-case';
import {
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

describe('UpdateBatchController', () => {
  let controller: UpdateBatchController;
  let mockUseCase: UpdateBatchUseCase;

  beforeEach(() => {
    mockUseCase = {
      update: jest.fn(),
    } as any;

    controller = new UpdateBatchController(mockUseCase);
  });

  it('deve atualizar e retornar o lote atualizado', async () => {
    const id = 1;
    const dto = { code: 'Atualizado' } as any;
    const loteAtualizado = { id, ...dto };

    (mockUseCase.update as jest.Mock).mockResolvedValue(loteAtualizado);

    const result = await controller.update(id, dto);

    expect(result).toEqual(loteAtualizado);
    expect(mockUseCase.update).toHaveBeenCalledWith(id, dto);
  });

  it('deve lançar NotAcceptableException se o ID for inválido', async () => {
    await expect(controller.update(NaN, {} as any)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.update).not.toHaveBeenCalled();
  });

  it('deve propagar erro do use-case (ex: NotFound)', async () => {
    (mockUseCase.update as jest.Mock).mockRejectedValue(
      new NotFoundException(),
    );

    await expect(controller.update(1, {} as any)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('deve propagar erro do use-case (ex: InternalServerError)', async () => {
    (mockUseCase.update as jest.Mock).mockRejectedValue(
      new InternalServerErrorException(),
    );

    await expect(controller.update(1, {} as any)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
