import { UpdateBatchPromotionUseCase } from './update-batch-promotion.use-case';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('UpdateBatchPromotionUseCase', () => {
  let useCase: UpdateBatchPromotionUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      update: jest.fn(),
    };

    useCase = new UpdateBatchPromotionUseCase(mockRepo);
  });

  it('deve atualizar a promoção do lote se ela existir', async () => {
    const id = 1;
    const dto = { code: 'PROMO-UPDATED' } as any;
    const encontrado = { id, code: 'OLD' };
    const atualizado = { id, ...dto };

    mockRepo.findById.mockResolvedValue(encontrado);
    mockRepo.update.mockResolvedValue(atualizado);

    const result = await useCase.update(id, dto);

    expect(result).toEqual(atualizado);
    expect(mockRepo.findById).toHaveBeenCalledWith(id);
    expect(mockRepo.update).toHaveBeenCalledWith(id, dto);
  });

  it('deve lançar NotFoundException se a promoção não existir', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.update(123, {} as any)).rejects.toThrow(
      NotFoundException,
    );
    expect(mockRepo.update).not.toHaveBeenCalled();
  });

  it('deve lançar InternalServerErrorException se update falhar', async () => {
    mockRepo.findById.mockResolvedValue({ id: 1 });
    mockRepo.update.mockResolvedValue(null);

    await expect(useCase.update(1, {} as any)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
