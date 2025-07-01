import { FindAllCategoryController } from './find-all-categories.controller';

describe('FindAllCategoryController', () => {
  let controller: FindAllCategoryController;
  let mockUseCase: any;

  beforeEach(() => {
    mockUseCase = {
      find: jest.fn(),
    };

    controller = new FindAllCategoryController(mockUseCase);
  });

  it('deve retornar categorias com paginação usando o método find do controller', async () => {
    const query = { page: 1, limit: 10 };

    const mockResult = {
      data: [{ id: 1, nome: 'Categoria A' }],
      currentPage: 1,
      totalPages: 1,
      totalItems: 1,
    };

    mockUseCase.find.mockResolvedValue(mockResult);

    const result = await controller.find(query);

    expect(result).toEqual(mockResult);
    expect(mockUseCase.find).toHaveBeenCalledWith(query);
  });
});
