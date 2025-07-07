import { IStockRepo } from 'src/stock/models/interface/stock-repo.interface';
import { DeleteStockUseCase } from './delete-stock.use-case';
import { NotFoundException } from '@nestjs/common';
import { TipoMovimentacao } from 'src/stock/models/entity/stock.entity';

describe('DeleteStockUseCase', () => {
  let useCase: DeleteStockUseCase;
  let mockRepo: jest.Mocked<IStockRepo>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<IStockRepo>;

    useCase = new DeleteStockUseCase(mockRepo);
  });

  it('deve deletar estoque existente', async () => {
    mockRepo.findById.mockResolvedValue({
      id: 1,
      quantity: 10,
      movementType: TipoMovimentacao.ENTRADA,
      movementDate: null,
      batch: null,
    });
    mockRepo.delete.mockResolvedValue(undefined);

    await expect(useCase.delete(1)).resolves.toBeUndefined();
    expect(mockRepo.findById).toHaveBeenCalledWith(1);
    expect(mockRepo.delete).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotFoundException se estoque não existir', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.delete(99)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(99);
    expect(mockRepo.delete).not.toHaveBeenCalled();
  });
});
