import { FindEmployeeLoginUseCase } from './find-employee-login.use-case';
import { NotFoundException } from '@nestjs/common';

describe('FindEmployeeLoginUseCase', () => {
  let useCase: FindEmployeeLoginUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
    };

    useCase = new FindEmployeeLoginUseCase(mockRepo);
  });

  it('deve retornar o login do funcionário pelo ID', async () => {
    const id = 1;
    const mockLogin = { id, username: 'func1' };

    mockRepo.findById.mockResolvedValue(mockLogin);

    const result = await useCase.find(id);

    expect(result).toEqual(mockLogin);
    expect(mockRepo.findById).toHaveBeenCalledWith(id);
  });

  it('deve lançar NotFoundException se o login não for encontrado', async () => {
    const id = 999;

    mockRepo.findById.mockResolvedValue(undefined);

    await expect(useCase.find(id)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(id);
  });
});
