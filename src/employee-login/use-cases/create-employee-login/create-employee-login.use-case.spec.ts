import { CreateEmployeeLoginUseCase } from './create-employee-login.use-case';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('CreateEmployeeLoginUseCase', () => {
  let useCase: CreateEmployeeLoginUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      find: jest.fn(),
      create: jest.fn(),
    };

    useCase = new CreateEmployeeLoginUseCase(mockRepo);
  });

  it('deve criar um novo login com senha hash', async () => {
    const dto = {
      personId: 1,
      password: 'senha123',
      login: 'teste',
      permissionLevel: 1,
    };
    const createdId = 101;

    mockRepo.find.mockResolvedValue({ data: [] });
    mockRepo.create.mockResolvedValue(createdId);

    const result = await useCase.create({ ...dto });

    expect(result).toBe(createdId);
    expect(mockRepo.find).toHaveBeenCalledWith({ personId: 1 });
    expect(mockRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        personId: 1,
        password: expect.any(String),
      }),
    );
    expect(
      bcrypt.compareSync('senha123', mockRepo.create.mock.calls[0][0].password),
    ).toBe(true);
  });

  it('deve lançar BadRequestException se pessoa já tiver login', async () => {
    const dto = {
      personId: 1,
      password: 'senha123',
      login: 'teste',
      permissionLevel: 1,
    };

    mockRepo.find.mockResolvedValue({ data: [{ id: 1 }] });

    await expect(useCase.create(dto)).rejects.toThrow(BadRequestException);
  });

  it('deve lançar erro se ID retornado não for número', async () => {
    const dto = {
      personId: 1,
      password: 'senha123',
      login: 'teste',
      permissionLevel: 1,
    };

    mockRepo.find.mockResolvedValue({ data: [] });
    mockRepo.create.mockResolvedValue(isNaN);

    await expect(useCase.create(dto)).rejects.toThrow();
  });
});
