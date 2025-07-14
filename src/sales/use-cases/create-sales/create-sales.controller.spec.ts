import { CreateSalesController } from './create-sales.controller';
import { CreateSalesUseCase } from './create-sales.use-case';
import { CreateSalesDTO } from 'src/sales/models/dtos/create-sales.dto';

describe('CreateSalesController', () => {
  let controller: CreateSalesController;
  let mockUseCase: CreateSalesUseCase;

  beforeEach(() => {
    mockUseCase = {
      create: jest.fn(),
    } as unknown as CreateSalesUseCase;

    controller = new CreateSalesController(mockUseCase);
  });

  it('deve criar uma venda e retornar o ID', async () => {
    const dto: CreateSalesDTO = {
      cpf: '11111111111',
      totalValue: 100,
      emissionDate: new Date(),
      customerId: 1,
      employeeId: 1,
    } as CreateSalesDTO;
    (mockUseCase.create as jest.Mock).mockResolvedValue(101);

    const result = await controller.create(dto);

    expect(result).toBe(101);
    expect(mockUseCase.create).toHaveBeenCalledWith(dto);
  });
});
