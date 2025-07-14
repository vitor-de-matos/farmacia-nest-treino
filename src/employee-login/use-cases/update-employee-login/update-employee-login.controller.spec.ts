import { UpdateEmployeeLoginController } from './update-employee-login.controller';
import {
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

describe('UpdateEmployeeLoginController', () => {
  let controller: UpdateEmployeeLoginController;
  let mockUseCase: any;

  beforeEach(() => {
    mockUseCase = {
      update: jest.fn(),
    };

    controller = new UpdateEmployeeLoginController(mockUseCase);
  });

  it('deve atualizar o login do funcionário com ID válido', async () => {
    const id = 1;
    const dto = { login: 'atualizado' };
    const updated = { id, login: 'atualizado' };

    mockUseCase.update.mockResolvedValue(updated);

    const result = await controller.update(id, dto);

    expect(result).toEqual(updated);
    expect(mockUseCase.update).toHaveBeenCalledWith(id, dto);
  });

  it('deve lançar NotAcceptableException se o ID não for numérico', async () => {
    const invalidId: any = 'abc';
    const dto = { login: 'teste' };

    await expect(controller.update(invalidId, dto)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.update).not.toHaveBeenCalled();
  });

  it('deve propagar NotFoundException se o funcionário não existir', async () => {
    const id = 999;
    const dto = { login: 'teste' };

    mockUseCase.update.mockRejectedValue(new NotFoundException());

    await expect(controller.update(id, dto)).rejects.toThrow(NotFoundException);
  });

  it('deve propagar InternalServerErrorException se houver erro interno', async () => {
    const id = 1;
    const dto = { login: 'teste' };

    mockUseCase.update.mockRejectedValue(new InternalServerErrorException());

    await expect(controller.update(id, dto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
