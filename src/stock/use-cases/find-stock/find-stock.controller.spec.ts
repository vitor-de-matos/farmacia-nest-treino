import { FindStockController } from './find-stock.controller';
import { FindStockUseCase } from './find-stock.use-case';
import {
  TipoMovimentacao,
  Estoque,
} from 'src/stock/models/entity/stock.entity';

describe('FindStockController', () => {
  let controller: FindStockController;
  let mockUseCase: FindStockUseCase;

  beforeEach(() => {
    mockUseCase = {
      find: jest.fn(),
    } as unknown as FindStockUseCase;

    controller = new FindStockController(mockUseCase);
  });

  it('deve retornar um estoque', async () => {
    const mockStock: Estoque = {
      id: 1,
      location: 'A1',
      quantity: 100,
      movementType: TipoMovimentacao.ENTRADA,
      movementDate: null,
      batch: null,
    } as Estoque;

    (mockUseCase.find as jest.Mock).mockResolvedValue(mockStock);

    const result = await controller.find(1);

    expect(result).toEqual(mockStock);
    expect(mockUseCase.find).toHaveBeenCalledWith(1);
  });

  it('deve lançar erro se id for inválido', async () => {
    await expect(controller.find(NaN)).rejects.toThrow(
      'Requisição inválida; era esperado um ID numérico válido.',
    );
    expect(mockUseCase.find).not.toHaveBeenCalled();
  });
});
