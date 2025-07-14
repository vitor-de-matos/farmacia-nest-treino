import { NotFoundException } from '@nestjs/common';
import { FindStockUseCase } from './find-stock.use-case';
import { IStockRepo } from 'src/stock/models/interface/stock-repo.interface';
import {
  TipoMovimentacao,
  Estoque,
} from 'src/stock/models/entity/stock.entity';

describe('FindStockUseCase', () => {
  let useCase: FindStockUseCase;
  let mockRepo: jest.Mocked<IStockRepo>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
    } as unknown as jest.Mocked<IStockRepo>;

    useCase = new FindStockUseCase(mockRepo);
  });

  it('deve retornar um estoque existente', async () => {
    const mockStock: Estoque = {
      id: 1,
      location: 'B1',
      quantity: 30,
      movementType: TipoMovimentacao.ENTRADA,
      movementDate: null,
      batch: null,
    } as Estoque;

    mockRepo.findById.mockResolvedValue(mockStock);

    const result = await useCase.find(1);

    expect(result).toEqual(mockStock);
    expect(mockRepo.findById).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotFoundException se não encontrar', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.find(99)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(99);
  });
});
