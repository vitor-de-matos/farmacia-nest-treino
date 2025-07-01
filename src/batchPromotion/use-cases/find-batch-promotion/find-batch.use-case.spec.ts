import { NotFoundException } from '@nestjs/common';
import { FindBatchPromotionUseCase } from './find-batch.use-case';

describe('FindBatchPromotionUseCase', () => {
  let useCase: FindBatchPromotionUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
    };

    useCase = new FindBatchPromotionUseCase(mockRepo);
  });

  it('deve retornar a promoção do lote se encontrada', async () => {
    const promocao = { id: 1, code: 'PROMO123' };
    mockRepo.findById.mockResolvedValue(promocao);

    const result = await useCase.find(1);

    expect(result).toEqual(promocao);
    expect(mockRepo.findById).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotFoundException se a promoção do lote não for encontrada', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.find(99)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(99);
  });
});
