import { BadRequestException } from '@nestjs/common';
import { CreateStockUseCase } from './create-stock.use-case';
import { TipoMovimentacao } from 'src/stock/models/entity/stock.entity';
import { CreateStockDTO } from 'src/stock/models/dtos/create-stock.dto';
import { IStockRepo } from 'src/stock/models/interface/stock-repo.interface';

describe('CreateStockUseCase', () => {
  let useCase: CreateStockUseCase;
  let mockRepo: jest.Mocked<IStockRepo>;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
    } as unknown as jest.Mocked<IStockRepo>;

    useCase = new CreateStockUseCase(mockRepo);
  });

  it('deve criar um estoque e retornar o ID', async () => {
    const dto: CreateStockDTO = {
      productId: 1,
      quantity: 10,
      location: 'Depósito A',
      movementType: TipoMovimentacao.ENTRADA,
      movementDate: null,
      batchId: 2,
    } as CreateStockDTO;

    mockRepo.create.mockResolvedValue(101);

    const result = await useCase.create(dto);

    expect(result).toBe(101);
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
  });

  it('deve lançar BadRequestException se retorno for inválido (NaN)', async () => {
    const dto: CreateStockDTO = {
      productId: 1,
      quantity: 5,
      location: 'Depósito B',
      movementType: TipoMovimentacao.SAIDA,
      movementDate: null,
      batchId: 2,
    } as CreateStockDTO;

    mockRepo.create.mockResolvedValue(NaN);

    await expect(useCase.create(dto)).rejects.toThrow(BadRequestException);
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
  });
});
