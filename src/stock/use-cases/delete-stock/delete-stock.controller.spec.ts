import { DeleteStockController } from './delete-stock.controller';
import { DeleteStockUseCase } from './delete-stock.use-case';

describe('DeleteStockController', () => {
  let controller: DeleteStockController;
  let mockUseCase: DeleteStockUseCase;

  beforeEach(() => {
    mockUseCase = {
      delete: jest.fn(),
    } as unknown as DeleteStockUseCase;

    controller = new DeleteStockController(mockUseCase);
  });

  it('deve deletar e retornar mensagem de sucesso', async () => {
    (mockUseCase.delete as jest.Mock).mockResolvedValue(undefined);

    const result = await controller.delete(5);

    expect(result).toBe('Estoque removido com sucesso');
    expect(mockUseCase.delete).toHaveBeenCalledWith(5);
  });

  it('deve lançar erro se id for inválido', async () => {
    await expect(controller.delete(NaN)).rejects.toThrow(
      'Id deve ser um numero',
    );
    expect(mockUseCase.delete).not.toHaveBeenCalled();
  });
});
