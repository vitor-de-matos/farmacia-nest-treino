import { CreateStockController } from './create-stock.controller';
import { CreateStockUseCase } from './create-stock.use-case';
import { TipoMovimentacao } from 'src/stock/models/entity/stock.entity';
import { CreateStockDTO } from 'src/stock/models/dtos/create-stock.dto';

describe('CreateStockController', () => {
  let controller: CreateStockController;
  let mockUseCase: CreateStockUseCase;

  beforeEach(() => {
    mockUseCase = {
      create: jest.fn(),
    } as unknown as CreateStockUseCase;

    controller = new CreateStockController(mockUseCase);
  });

  it('deve criar um estoque e retornar o ID', async () => {
    const dto: CreateStockDTO = {
      productId: 2,
      quantity: 20,
      location: 'Setor B',
      movementType: TipoMovimentacao.ENTRADA,
      movementDate: null,
      batchId: 2,
    } as CreateStockDTO;

    (mockUseCase.create as jest.Mock).mockResolvedValue(202);

    const result = await controller.create(dto);

    expect(result).toBe(202);
    expect(mockUseCase.create).toHaveBeenCalledWith(dto);
  });
});
