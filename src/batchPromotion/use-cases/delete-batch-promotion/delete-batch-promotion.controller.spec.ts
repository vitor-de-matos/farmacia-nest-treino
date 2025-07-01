import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { DeleteBatchPromotionController } from './delete-batch-promotion.controller';
import { DeleteBatchPromotionUseCase } from './delete-batch-promotion.use-case';

describe('DeleteBatchPromotionController', () => {
  let controller: DeleteBatchPromotionController;
  let mockUseCase: DeleteBatchPromotionUseCase;

  beforeEach(() => {
    mockUseCase = {
      delete: jest.fn(),
    } as any;

    controller = new DeleteBatchPromotionController(mockUseCase);
  });

  it('deve deletar a promoção de lote e retornar mensagem de sucesso', async () => {
    (mockUseCase.delete as jest.Mock).mockResolvedValue(undefined);

    const result = await controller.delete(1);

    expect(result).toBe('Promoção lote removido com sucesso');
    expect(mockUseCase.delete).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotAcceptableException se o ID for inválido', async () => {
    await expect(controller.delete(NaN)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.delete).not.toHaveBeenCalled();
  });

  it('deve propagar erro do use-case (ex: NotFoundException)', async () => {
    (mockUseCase.delete as jest.Mock).mockRejectedValue(
      new NotFoundException(),
    );

    await expect(controller.delete(99)).rejects.toThrow(NotFoundException);
  });
});
