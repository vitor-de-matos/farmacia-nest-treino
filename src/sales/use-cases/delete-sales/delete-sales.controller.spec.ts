import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { DeleteSalesController } from './delete-sales.controller';
import { DeleteSalesUseCase } from './delete-sales.use-case';

describe('DeleteSalesController', () => {
  let controller: DeleteSalesController;
  let mockUseCase: DeleteSalesUseCase;

  beforeEach(() => {
    mockUseCase = {
      delete: jest.fn(),
    } as unknown as DeleteSalesUseCase;

    controller = new DeleteSalesController(mockUseCase);
  });

  it('deve deletar a venda e retornar mensagem de sucesso', async () => {
    (mockUseCase.delete as jest.Mock).mockResolvedValue(undefined);

    const result = await controller.delete(1);

    expect(result).toBe('Venda removida com sucesso');
    expect(mockUseCase.delete).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotAcceptableException se o ID não for numérico', async () => {
    await expect(controller.delete('abc' as any)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.delete).not.toHaveBeenCalled();
  });

  it('deve lançar NotFoundException se a venda não existir', async () => {
    (mockUseCase.delete as jest.Mock).mockRejectedValue(
      new NotFoundException(),
    );

    await expect(controller.delete(999)).rejects.toThrow(NotFoundException);
    expect(mockUseCase.delete).toHaveBeenCalledWith(999);
  });
});
