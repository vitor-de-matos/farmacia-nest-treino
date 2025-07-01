import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { DeleteBatchController } from './delete-batch.controller';
import { DeleteBatchUseCase } from './delete-batch.use-case';

describe('DeleteBatchController', () => {
  let controller: DeleteBatchController;
  let mockUseCase: DeleteBatchUseCase;

  beforeEach(() => {
    mockUseCase = {
      delete: jest.fn(),
    } as any;

    controller = new DeleteBatchController(mockUseCase);
  });

  it('deve excluir lote e retornar mensagem de sucesso', async () => {
    (mockUseCase.delete as jest.Mock).mockResolvedValue(undefined);

    const response = await controller.delete(1);

    expect(response).toBe('Lote removido com sucesso');
    expect(mockUseCase.delete).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotAcceptableException para id inválido', async () => {
    await expect(controller.delete(NaN)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.delete).not.toHaveBeenCalled();
  });

  it('deve propagar erro do use-case', async () => {
    (mockUseCase.delete as jest.Mock).mockRejectedValue(
      new NotFoundException('Lote não encontrado'),
    );

    await expect(controller.delete(99)).rejects.toThrow(NotFoundException);
  });
});
