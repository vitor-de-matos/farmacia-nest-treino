import { DeleteBatchUseCase } from './delete-batch.use-case';
import { NotFoundException } from '@nestjs/common';

describe('DeleteBatchUseCase', () => {
  let useCase: DeleteBatchUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new DeleteBatchUseCase(mockRepo);
  });

  it('deve deletar o lote se ele existir', async () => {
    mockRepo.findById.mockResolvedValue({ id: 1 });
    mockRepo.delete.mockResolvedValue(undefined);

    await useCase.delete(1);

    expect(mockRepo.findById).toHaveBeenCalledWith(1);
    expect(mockRepo.delete).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotFoundException se o lote não existir', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.delete(123)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(123);
    expect(mockRepo.delete).not.toHaveBeenCalled();
  });
});
