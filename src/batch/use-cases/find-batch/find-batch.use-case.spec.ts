import { NotFoundException } from '@nestjs/common';
import { FindBatchUseCase } from './find-batch.use-case';

describe('FindBatchUseCase', () => {
  let useCase: FindBatchUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
    };

    useCase = new FindBatchUseCase(mockRepo);
  });

  it('deve retornar o lote se encontrado', async () => {
    const mockLote = { id: 1, code: 'L001' };
    mockRepo.findById.mockResolvedValue(mockLote);

    const result = await useCase.find(1);

    expect(result).toEqual(mockLote);
    expect(mockRepo.findById).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotFoundException se o lote não for encontrado', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.find(999)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(999);
  });
});
