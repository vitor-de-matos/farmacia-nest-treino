import { DeleteBatchPromotionUseCase } from './delete-batch-promotion.use-case';
import { NotFoundException } from '@nestjs/common';

describe('DeleteBatchPromotionUseCase', () => {
  let useCase: DeleteBatchPromotionUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new DeleteBatchPromotionUseCase(mockRepo);
  });

  it('deve excluir o lote de promoção se ele existir', async () => {
    mockRepo.findById.mockResolvedValue({ id: 1 });
    mockRepo.delete.mockResolvedValue(undefined);

    await useCase.delete(1);

    expect(mockRepo.findById).toHaveBeenCalledWith(1);
    expect(mockRepo.delete).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotFoundException se o lote não existir', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.delete(999)).rejects.toThrow(NotFoundException);
    expect(mockRepo.delete).not.toHaveBeenCalled();
  });
});
