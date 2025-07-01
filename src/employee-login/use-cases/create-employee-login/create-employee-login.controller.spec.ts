import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateEmployeeLoginController } from './create-employee-login.controller';

describe('CreateEmployeeLoginController', () => {
  let controller: CreateEmployeeLoginController;
  let mockUseCase: any;

  beforeEach(() => {
    mockUseCase = {
      create: jest.fn(),
    };

    controller = new CreateEmployeeLoginController(mockUseCase);
  });

  it('deve criar um novo login de funcionário e retornar o ID', async () => {
    const dto = {
      personId: 1,
      password: 'senha123',
      login: 'teste',
      permissionLevel: 1,
    };
    const expectedId = 42;

    mockUseCase.create.mockResolvedValue(expectedId);

    const result = await controller.create(dto);

    expect(result).toBe(expectedId);
    expect(mockUseCase.create).toHaveBeenCalledWith(dto);
  });

  it('deve lançar BadRequestException se já houver login', async () => {
    const dto = {
      personId: 1,
      password: 'senha123',
      login: 'teste',
      permissionLevel: 1,
    };

    mockUseCase.create.mockRejectedValue(new BadRequestException());

    await expect(controller.create(dto)).rejects.toThrow(BadRequestException);
  });

  it('deve lançar InternalServerErrorException em erro interno', async () => {
    const dto = {
      personId: 1,
      password: 'senha123',
      login: 'teste',
      permissionLevel: 1,
    };

    mockUseCase.create.mockRejectedValue(new InternalServerErrorException());

    await expect(controller.create(dto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
