import { FindAllStockUseCase } from './find-all-stock.use-case';
import { FindStockDTO } from 'src/stock/models/dtos/find-stock.dto';
import { IStockRepo } from 'src/stock/models/interface/stock-repo.interface';
import {
  TipoMovimentacao,
  Estoque,
} from 'src/stock/models/entity/stock.entity';

describe('FindAllStockUseCase', () => {
  let useCase: FindAllStockUseCase;
  let mockRepo: jest.Mocked<IStockRepo>;

  beforeEach(() => {
    mockRepo = {
      find: jest.fn(),
    } as unknown as jest.Mocked<IStockRepo>;

    useCase = new FindAllStockUseCase(mockRepo);
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

    mockRepo.find.mockResolvedValue(mockResult);

    const result = await useCase.find(dto);

    expect(result).toEqual(mockResult);
    expect(mockRepo.find).toHaveBeenCalledWith(dto);
  });
});
