import { FindAllBatchUseCase } from './find-all-batchs.use-case';

describe('FindAllBatchUseCase', () => {
  let useCase: FindAllBatchUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      find: jest.fn(),
    };

    useCase = new FindAllBatchUseCase(mockRepo);
  });

  it('deve retornar os lotes paginados conforme o filtro', async () => {
    const filtro = { page: 1, limit: 10 } as any;

    const mockResult = {
      data: [{ id: 1, code: 'L1' }],
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
