import { BadRequestException } from '@nestjs/common';
import { CreateCategoryUseCase } from './create-category.use-case';

describe('CreateCategoryUseCase', () => {
  let useCase: CreateCategoryUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
    };

    useCase = new CreateCategoryUseCase(mockRepo);
  });

  it('deve retornar o ID da categoria criada', async () => {
    mockRepo.create.mockResolvedValue(100);

    const result = await useCase.create({ name: 'Categoria A' } as any);

    expect(result).toBe(100);
    expect(mockRepo.create).toHaveBeenCalledWith({ name: 'Categoria A' });
  });

  it('deve lançar BadRequestException se o retorno for NaN', async () => {
    mockRepo.create.mockResolvedValue(NaN);

    await expect(
      useCase.create({ name: 'Categoria inválida' } as any),
    ).rejects.toThrow(BadRequestException);
  });
});
