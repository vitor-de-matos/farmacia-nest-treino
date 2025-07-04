import { CreatePersonDTO } from 'src/person/models/dtos/create-person.dto';
import { CreatePersonController } from './create-person.controller';
import { CreatePersonUseCase } from './create-person.use-case';
import { NotAcceptableException } from '@nestjs/common';

describe('CreatePersonController', () => {
  let controller: CreatePersonController;
  let mockUseCase: CreatePersonUseCase;

  beforeEach(() => {
    mockUseCase = {
      create: jest.fn(),
    } as unknown as CreatePersonUseCase;

    controller = new CreatePersonController(mockUseCase);
  });

  it('deve criar uma pessoa e retornar o ID', async () => {
    const dto: CreatePersonDTO = {
      name: 'João',
      document: '12345678901',
    } as CreatePersonDTO;

    (mockUseCase.create as jest.Mock).mockResolvedValue(1);

    const result = await controller.create(dto);

    expect(result).toBe(1);
    expect(mockUseCase.create).toHaveBeenCalledWith(dto);
  });

  it('deve lançar NotAcceptableException se o documento tiver tamanho inválido', async () => {
    const dto: CreatePersonDTO = {
      name: 'Maria',
      document: '12345',
    } as CreatePersonDTO;

    await expect(controller.create(dto)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.create).not.toHaveBeenCalled();
  });
});
