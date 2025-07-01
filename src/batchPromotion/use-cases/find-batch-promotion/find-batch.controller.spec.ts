import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { FindBatchPromotionController } from './find-batch.controller';
import { FindBatchPromotionUseCase } from './find-batch.use-case';

describe('FindBatchPromotionController', () => {
  let controller: FindBatchPromotionController;
  let mockUseCase: FindBatchPromotionUseCase;

  beforeEach(() => {
    mockUseCase = {
      find: jest.fn(),
    } as any;

    controller = new FindBatchPromotionController(mockUseCase);
  });

  it('deve retornar a promoção do lote se o ID for válido', async () => {
    const promo = { id: 1, code: 'PROMO123' };
    (mockUseCase.find as jest.Mock).mockResolvedValue(promo);

    const result = await controller.find(1);

    expect(result).toEqual(promo);
    expect(mockUseCase.find).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotAcceptableException se o ID for inválido', async () => {
    await expect(controller.find(NaN)).rejects.toThrow(NotAcceptableException);
    expect(mockUseCase.find).not.toHaveBeenCalled();
  });

  it('deve propagar erro do use-case (ex: NotFoundException)', async () => {
    (mockUseCase.find as jest.Mock).mockRejectedValue(new NotFoundException());

    await expect(controller.find(999)).rejects.toThrow(NotFoundException);
  });
});
