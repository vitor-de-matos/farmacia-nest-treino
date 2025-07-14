import { DeleteEmployeeLoginUseCase } from './delete-employee-login.use-case';
import { NotFoundException } from '@nestjs/common';

describe('DeleteEmployeeLoginUseCase', () => {
  let useCase: DeleteEmployeeLoginUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new DeleteEmployeeLoginUseCase(mockRepo);
  });

  it('deve deletar um login de funcionário existente', async () => {
    const id = 1;

    mockRepo.findById.mockResolvedValue({ id });
    mockRepo.delete.mockResolvedValue(undefined);

    await expect(useCase.delete(id)).resolves.toBeUndefined();
    expect(mockRepo.findById).toHaveBeenCalledWith(id);
    expect(mockRepo.delete).toHaveBeenCalledWith(id);
  });

  it('deve lançar NotFoundException se o login não for encontrado', async () => {
    const id = 999;

    mockRepo.findById.mockResolvedValue(undefined);

    await expect(useCase.delete(id)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(id);
    expect(mockRepo.delete).not.toHaveBeenCalled();
  });
});
