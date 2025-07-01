import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateEmployeeLoginUseCase } from './update-employee-login.use-case';

describe('UpdateEmployeeLoginUseCase', () => {
  let useCase: UpdateEmployeeLoginUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      update: jest.fn(),
    };

    useCase = new UpdateEmployeeLoginUseCase(mockRepo);
  });

  it('deve atualizar o login de funcionário se existir', async () => {
    const id = 1;
    const dto = { login: 'novo-usuario' };
    const mockUpdated = { id, login: 'novo-usuario' };

    mockRepo.findById.mockResolvedValue({ id });
    mockRepo.update.mockResolvedValue(mockUpdated);

    const result = await useCase.update(id, dto);

    expect(result).toEqual(mockUpdated);
    expect(mockRepo.findById).toHaveBeenCalledWith(id);
    expect(mockRepo.update).toHaveBeenCalledWith(id, dto);
  });

  it('deve lançar NotFoundException se o login não for encontrado', async () => {
    const id = 999;
    const dto = { login: 'naoexiste' };

    mockRepo.findById.mockResolvedValue(undefined);

    await expect(useCase.update(id, dto)).rejects.toThrow(NotFoundException);
  });

  it('deve lançar InternalServerErrorException se a atualização falhar', async () => {
    const id = 1;
    const dto = { login: 'falha' };

    mockRepo.findById.mockResolvedValue({ id });
    mockRepo.update.mockResolvedValue(null);

    await expect(useCase.update(id, dto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
