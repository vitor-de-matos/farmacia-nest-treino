import {
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateBatchPromotionController } from './update-batch-promotion.controller';
import { UpdateBatchPromotionUseCase } from './update-batch-promotion.use-case';

describe('UpdateBatchPromotionController', () => {
  let controller: UpdateBatchPromotionController;
  let mockUseCase: UpdateBatchPromotionUseCase;

  beforeEach(() => {
    mockUseCase = {
      update: jest.fn(),
    } as any;

    controller = new UpdateBatchPromotionController(mockUseCase);
  });

  it('deve atualizar e retornar a promoção do lote', async () => {
    const id = 1;
    const dto = { code: 'PROMO-UPDATED' } as any;
    const atualizado = { id, ...dto };

    (mockUseCase.update as jest.Mock).mockResolvedValue(atualizado);

    const result = await controller.update(id, dto);

    expect(result).toEqual(atualizado);
    expect(mockUseCase.update).toHaveBeenCalledWith(id, dto);
  });

  it('deve lançar NotAcceptableException se o ID for inválido', async () => {
    await expect(controller.update(NaN, {} as any)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.update).not.toHaveBeenCalled();
  });

  it('deve propagar erro do use-case (ex: NotFoundException)', async () => {
    (mockUseCase.update as jest.Mock).mockRejectedValue(
      new NotFoundException(),
    );

    await expect(controller.update(123, {} as any)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('deve propagar erro do use-case (ex: InternalServerErrorException)', async () => {
    (mockUseCase.update as jest.Mock).mockRejectedValue(
      new InternalServerErrorException(),
    );

    await expect(controller.update(123, {} as any)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
