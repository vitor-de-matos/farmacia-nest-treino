import { BadRequestException } from '@nestjs/common';
import { CreateBatchPromotionUseCase } from './create-batch-promotion.use-case';

describe('CreateBatchPromotionUseCase', () => {
  let useCase: CreateBatchPromotionUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
    };

    useCase = new CreateBatchPromotionUseCase(mockRepo);
  });

  it('deve retornar o ID da promoção criada', async () => {
    mockRepo.create.mockResolvedValue(456);

    const result = await useCase.create({ name: 'Promoção 1' } as any);

    expect(result).toBe(456);
    expect(mockRepo.create).toHaveBeenCalledWith({ name: 'Promoção 1' });
  });

  it('deve lançar BadRequestException se o retorno for NaN', async () => {
    mockRepo.create.mockResolvedValue(NaN);

    await expect(
      useCase.create({ name: 'Promoção inválida' } as any),
    ).rejects.toThrow(BadRequestException);
  });
});
