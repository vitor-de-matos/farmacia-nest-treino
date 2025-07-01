import { FindAllCategoryUseCase } from './find-all-categories.use-case';

describe('FindAllCategoryUseCase', () => {
  let useCase: FindAllCategoryUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      find: jest.fn(),
    };

    useCase = new FindAllCategoryUseCase(mockRepo);
  });

  it('deve retornar categorias com paginação', async () => {
    const filtro = { page: 1, limit: 10 } as any;

    const mockResult = {
      data: [{ id: 1, nome: 'Categoria A' }],
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
