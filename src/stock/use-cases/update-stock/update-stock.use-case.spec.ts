import { IStockRepo } from 'src/stock/models/interface/stock-repo.interface';
import { UpdateStockUseCase } from './update-stock.use-case';
import { UpdateStockDTO } from 'src/stock/models/dtos/update-stock.dto';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TipoMovimentacao } from 'src/stock/models/entity/stock.entity';

describe('UpdateStockUseCase', () => {
  let useCase: UpdateStockUseCase;
  let mockRepo: jest.Mocked<IStockRepo>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<IStockRepo>;

    useCase = new UpdateStockUseCase(mockRepo);
  });

  it('deve atualizar e retornar o estoque', async () => {
    const dto: UpdateStockDTO = { quantity: 200, batchId: 2 };
    const existingStock = {
      id: 1,
      quantity: 10,
      movementType: TipoMovimentacao.SAIDA,
      movementDate: null,
      batch: null,
    };
    const updatedStock = {
      id: 1,
      quantity: 200,
      movementType: TipoMovimentacao.ENTRADA,
      movementDate: null,
      batch: null,
    };

    mockRepo.findById.mockResolvedValue(existingStock);
    mockRepo.update.mockResolvedValue(updatedStock);

    const result = await useCase.update(1, dto);

    expect(result).toEqual(updatedStock);
    expect(mockRepo.findById).toHaveBeenCalledWith(1);
    expect(mockRepo.update).toHaveBeenCalledWith(1, dto);
  });

  it('deve lançar NotFoundException se estoque não existir', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(
      useCase.update(99, {
        quantity: 10,
        movementType: TipoMovimentacao.ENTRADA,
        movementDate: null,
        batchId: 2,
      }),
    ).rejects.toThrow(NotFoundException);
    expect(mockRepo.update).not.toHaveBeenCalled();
  });

  it('deve lançar InternalServerErrorException se falhar na atualização', async () => {
    mockRepo.findById.mockResolvedValue({
      id: 1,
      quantity: 200,
      movementType: TipoMovimentacao.ENTRADA,
      movementDate: null,
      batch: null,
    });
    mockRepo.update.mockResolvedValue(null);

    await expect(
      useCase.update(1, {
        quantity: 10,
        movementType: TipoMovimentacao.ENTRADA,
        movementDate: null,
        batchId: 2,
      }),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
