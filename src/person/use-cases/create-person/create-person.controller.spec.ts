import { CreatePersonController } from './create-person.controller';
import { NotAcceptableException } from '@nestjs/common';
import { CreatePersonUseCase } from './create-person.use-case';
import { CreatePersonDTO } from 'src/person/models/dtos/create-person.dto';
import { getMockReq } from '@jest-mock/express';

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

    const mockRequest = getMockReq({ user: { id: 1 } });

    (mockUseCase.create as jest.Mock).mockResolvedValue(1);

    const result = await controller.create(dto, mockRequest);

    expect(result).toBe(1);
    expect(mockUseCase.create).toHaveBeenCalledWith(dto, mockRequest);
  });

  it('deve lançar NotAcceptableException se o documento tiver tamanho inválido', async () => {
    const dto: CreatePersonDTO = {
      name: 'Maria',
      document: '12345',
    } as CreatePersonDTO;
    const mockRequest = getMockReq({ user: { id: 1 } });

    await expect(controller.create(dto, mockRequest)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.create).not.toHaveBeenCalled();
  });
});
