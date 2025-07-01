import { FindAllBatchPromotionController } from './find-all-batch-promotion.controller';
import { FindAllBatchPromotionUseCase } from './find-all-batch-promotion.use-case';

describe('FindAllBatchPromotionController', () => {
  let controller: FindAllBatchPromotionController;
  let mockUseCase: FindAllBatchPromotionUseCase;

  beforeEach(() => {
    mockUseCase = {
      find: jest.fn(),
    } as any;

    controller = new FindAllBatchPromotionController(mockUseCase);
  });

  it('deve retornar promoções de lote paginadas', async () => {
    const filtro = { page: 1, limit: 5 } as any;

    const resultadoEsperado = {
      data: [{ id: 1, code: 'PROMO123' }],
      currentPage: 1,
      totalPages: 1,
      totalItems: 1,
    };

    (mockUseCase.find as jest.Mock).mockResolvedValue(resultadoEsperado);

    const result = await controller.find(filtro);

    expect(result).toEqual(resultadoEsperado);
    expect(mockUseCase.find).toHaveBeenCalledWith(filtro);
  });
});
