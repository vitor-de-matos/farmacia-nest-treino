import { FindAllEmployeeLoginUseCase } from './find-all-employee-login.use-case';

describe('FindAllEmployeeLoginUseCase', () => {
  let useCase: FindAllEmployeeLoginUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      find: jest.fn(),
    };

    useCase = new FindAllEmployeeLoginUseCase(mockRepo);
  });

  it('deve retornar logins de funcionários com paginação', async () => {
    const filtro = { page: 1, limit: 10 } as any;

    const mockResult = {
      data: [{ id: 1, username: 'funcionario1' }],
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
