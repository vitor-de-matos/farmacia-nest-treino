import { FindEmployeeLoginController } from './find-employee-login.controller';
import {
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

describe('FindEmployeeLoginController', () => {
  let controller: FindEmployeeLoginController;
  let mockUseCase: any;

  beforeEach(() => {
    mockUseCase = {
      find: jest.fn(),
    };

    controller = new FindEmployeeLoginController(mockUseCase);
  });

  it('deve retornar login de funcionário com ID válido', async () => {
    const id = 1;
    const mockLogin = { id, username: 'func1' };

    mockUseCase.find.mockResolvedValue(mockLogin);

    const result = await controller.find(id);

    expect(result).toEqual(mockLogin);
    expect(mockUseCase.find).toHaveBeenCalledWith(id);
  });

  it('deve lançar NotAcceptableException se o ID não for numérico', async () => {
    const invalidId: any = 'abc';

    await expect(controller.find(invalidId)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.find).not.toHaveBeenCalled();
  });

  it('deve propagar NotFoundException se login não for encontrado', async () => {
    const id = 999;

    mockUseCase.find.mockRejectedValue(new NotFoundException());

    await expect(controller.find(id)).rejects.toThrow(NotFoundException);
  });

  it('deve propagar InternalServerErrorException em erro interno', async () => {
    const id = 1;

    mockUseCase.find.mockRejectedValue(new InternalServerErrorException());

    await expect(controller.find(id)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
