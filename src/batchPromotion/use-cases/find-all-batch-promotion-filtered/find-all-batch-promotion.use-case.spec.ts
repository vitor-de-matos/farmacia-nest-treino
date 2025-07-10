import { FindAllBatchPromotionUseCase } from './find-all-batch-promotion.use-case';

describe('FindAllBatchPromotionUseCase', () => {
  let useCase: FindAllBatchPromotionUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      find: jest.fn(),
    };

    useCase = new FindAllBatchPromotionUseCase(mockRepo);
  });

  it('deve retornar promoções de lote com paginação', async () => {
    const filtro = { page: 1, limit: 10 } as any;

    const mockResult = {
      data: [{ id: 1, code: 'PROMO123' }],
      currentPage: 1,
      totalPages: 1,
      totalItems: 1,
    };

    mockRepo.find.mockResolvedValue(mockResult);

    const result = await useCase.find(filtro);

    expect(result).toEqual(mockResult);
    expect(mockRepo.find).toHaveBeenCalledWith(filtro);
  });
});
