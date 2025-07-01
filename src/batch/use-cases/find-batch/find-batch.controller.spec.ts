import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { FindBatchController } from './find-batch.controller';
import { FindBatchUseCase } from './find-batch.use-case';

describe('FindBatchController', () => {
  let controller: FindBatchController;
  let mockUseCase: FindBatchUseCase;

  beforeEach(() => {
    mockUseCase = {
      find: jest.fn(),
    } as any;

    controller = new FindBatchController(mockUseCase);
  });

  it('deve retornar o lote se o ID for válido', async () => {
    const mockLote = { id: 1, code: 'L001' };
    (mockUseCase.find as jest.Mock).mockResolvedValue(mockLote);

    const result = await controller.find(1);

    expect(result).toEqual(mockLote);
    expect(mockUseCase.find).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotAcceptableException se ID for inválido (NaN)', async () => {
    await expect(controller.find(NaN)).rejects.toThrow(NotAcceptableException);
    expect(mockUseCase.find).not.toHaveBeenCalled();
  });

  it('deve propagar erro do use-case se lote não for encontrado', async () => {
    (mockUseCase.find as jest.Mock).mockRejectedValue(
      new NotFoundException('Lote não encontrado'),
    );

    await expect(controller.find(999)).rejects.toThrow(NotFoundException);
  });
});
