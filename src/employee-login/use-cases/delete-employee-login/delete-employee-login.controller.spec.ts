import {
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { DeleteEmployeeLoginController } from './delete-employee-login.controller';

describe('DeleteEmployeeLoginController', () => {
  let controller: DeleteEmployeeLoginController;
  let mockUseCase: any;

  beforeEach(() => {
    mockUseCase = {
      delete: jest.fn(),
    };

    controller = new DeleteEmployeeLoginController(mockUseCase);
  });

  it('deve deletar o login de funcionário com ID válido', async () => {
    const id = 1;

    mockUseCase.delete.mockResolvedValue(undefined);

    await expect(controller.delete(id)).resolves.toBe(
      'Login de funcionario removido com sucesso',
    );
    expect(mockUseCase.delete).toHaveBeenCalledWith(id);
  });

  it('deve lançar NotAcceptableException se o ID não for numérico', async () => {
    const invalidId: any = 'abc';

    await expect(controller.delete(invalidId)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.delete).not.toHaveBeenCalled();
  });

  it('deve propagar NotFoundException se login não for encontrado', async () => {
    const id = 999;
    mockUseCase.delete.mockRejectedValue(new NotFoundException());

    await expect(controller.delete(id)).rejects.toThrow(NotFoundException);
  });

  it('deve propagar InternalServerErrorException se houver erro interno', async () => {
    const id = 1;
    mockUseCase.delete.mockRejectedValue(new InternalServerErrorException());

    await expect(controller.delete(id)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
