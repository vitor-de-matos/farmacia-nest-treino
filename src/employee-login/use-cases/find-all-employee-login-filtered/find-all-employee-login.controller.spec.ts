import { FindAllEmployeeLoginController } from './find-all-employee-login.controller';

describe('FindAllEmployeeLoginController', () => {
  let controller: FindAllEmployeeLoginController;
  let mockUseCase: any;

  beforeEach(() => {
    mockUseCase = {
      find: jest.fn(),
    };

    controller = new FindAllEmployeeLoginController(mockUseCase);
  });

  it('deve retornar logins de funcionários com paginação', async () => {
    const query = { page: 1, limit: 10 };

    const mockResult = {
      data: [{ id: 1, username: 'funcionario1' }],
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
