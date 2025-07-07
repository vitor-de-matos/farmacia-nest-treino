import { UpdateStockDTO } from 'src/stock/models/dtos/update-stock.dto';
import { UpdateStockController } from './update-stock.controller';
import { UpdateStockUseCase } from './update-stock.use-case';

describe('UpdateStockController', () => {
  let controller: UpdateStockController;
  let mockUseCase: UpdateStockUseCase;

  beforeEach(() => {
    mockUseCase = {
      update: jest.fn(),
    } as unknown as UpdateStockUseCase;

    controller = new UpdateStockController(mockUseCase);
  });

  it('deve atualizar e retornar o estoque', async () => {
    const dto: UpdateStockDTO = { quantity: 100, batchId: 2 };
    const updated = { id: 1, quantity: 100 };

    (mockUseCase.update as jest.Mock).mockResolvedValue(updated);

    const result = await controller.update(1, dto);

    expect(result).toEqual(updated);
    expect(mockUseCase.update).toHaveBeenCalledWith(1, dto);
  });

  it('deve lançar erro se id for inválido', async () => {
    await expect(
      controller.update(NaN, { quantity: 5, batchId: 2 }),
    ).rejects.toThrow('Id deve ser um numero');
    expect(mockUseCase.update).not.toHaveBeenCalled();
  });
});
