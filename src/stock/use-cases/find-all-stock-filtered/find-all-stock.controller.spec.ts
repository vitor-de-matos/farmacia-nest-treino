import { FindStockDTO } from 'src/stock/models/dtos/find-stock.dto';
import { FindAllStockController } from './find-all-stock.controller';
import { FindAllStockUseCase } from './find-all-stock.use-case';
import {
  Estoque,
  TipoMovimentacao,
} from 'src/stock/models/entity/stock.entity';

describe('FindAllStockController', () => {
  let controller: FindAllStockController;
  let mockUseCase: FindAllStockUseCase;

  beforeEach(() => {
    mockUseCase = {
      find: jest.fn(),
    } as unknown as FindAllStockUseCase;

    controller = new FindAllStockController(mockUseCase);
  });

  it('deve retornar lista paginada de estoques', async () => {
    const dto: FindStockDTO = {
      page: 1,
      quantity: 10,
    };

    const mockResult = {
      data: [
        {
          id: 1,
          location: 'A1',
          quantity: 50,
          movementType: TipoMovimentacao.SAIDA,
          movementDate: null,
          batch: null,
        } as Estoque,
      ],
      currentPage: 1,
      totalPages: 1,
      totalItems: 1,
    };

    (mockUseCase.find as jest.Mock).mockResolvedValue(mockResult);

    const result = await controller.find(dto);

    expect(result).toEqual(mockResult);
    expect(mockUseCase.find).toHaveBeenCalledWith(dto);
  });
});
