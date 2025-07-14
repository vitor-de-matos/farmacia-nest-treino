import { FindAllSalesUseCase } from './find-all-sales.use-case';
import { FindSalesDTO } from 'src/sales/models/dtos/find-sales.dto';
import { ISalesRepo } from 'src/sales/models/interface/sales-repo.interface';
import { Venda } from 'src/sales/models/entity/sales.entity';

describe('FindAllSalesUseCase', () => {
  let useCase: FindAllSalesUseCase;
  let mockRepo: jest.Mocked<ISalesRepo>;

  beforeEach(() => {
    mockRepo = {
      find: jest.fn(),
    } as unknown as jest.Mocked<ISalesRepo>;

    useCase = new FindAllSalesUseCase(mockRepo);
  });

  it('deve retornar uma lista paginada de vendas', async () => {
    const dto: FindSalesDTO = { page: 1, quantity: 10 };

    const mockResponse = {
      data: [
        { id: 1, cpf: '123', totalValue: 100 } as Venda,
        { id: 2, cpf: '456', totalValue: 200 } as Venda,
      ],
      currentPage: 1,
      totalPages: 1,
      totalItems: 2,
    };

    mockRepo.find.mockResolvedValue(mockResponse);

    const result = await useCase.find(dto);

    expect(result).toEqual(mockResponse);
    expect(mockRepo.find).toHaveBeenCalledWith(dto);
  });
});
