import { FindSalesDTO } from 'src/sales/models/dtos/find-sales.dto';
import { FindAllSalesController } from './find-all-sales.controller';
import { FindAllSalesUseCase } from './find-all-sales.use-case';
import { Venda } from 'src/sales/models/entity/sales.entity';

describe('FindAllSalesController', () => {
  let controller: FindAllSalesController;
  let useCase: FindAllSalesUseCase;

  beforeEach(() => {
    useCase = {
      find: jest.fn(),
    } as unknown as FindAllSalesUseCase;

    controller = new FindAllSalesController(useCase);
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

    (useCase.find as jest.Mock).mockResolvedValue(mockResponse);

    const result = await controller.find(dto);

    expect(result).toEqual(mockResponse);
    expect(useCase.find).toHaveBeenCalledWith(dto);
  });
});
