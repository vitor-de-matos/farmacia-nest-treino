import { BadRequestException } from '@nestjs/common';
import { CreateBatchPromotionController } from './create-batch-promotion.controller';
import { CreateBatchPromotionUseCase } from './create-batch-promotion.use-case';

describe('CreateBatchPromotionController', () => {
  let controller: CreateBatchPromotionController;
  let mockUseCase: CreateBatchPromotionUseCase;

  beforeEach(() => {
    mockUseCase = {
      create: jest.fn(),
    } as any;

    controller = new CreateBatchPromotionController(mockUseCase);
  });

  it('deve retornar o ID da promoção criada', async () => {
    (mockUseCase.create as jest.Mock).mockResolvedValue(789);
    const dto = { name: 'Promoção Especial' } as any;

    const result = await controller.create(dto);

    expect(result).toBe(789);
    expect(mockUseCase.create).toHaveBeenCalledWith(dto);
  });

  it('deve propagar exceção do use-case', async () => {
    (mockUseCase.create as jest.Mock).mockRejectedValue(
      new BadRequestException('Erro simulado'),
    );

    await expect(controller.create({} as any)).rejects.toThrow(
      BadRequestException,
    );
  });
});
