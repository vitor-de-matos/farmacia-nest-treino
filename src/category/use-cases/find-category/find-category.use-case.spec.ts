import { NotFoundException } from '@nestjs/common';
import { FindCategoryUseCase } from './find-category.use-case';

describe('FindCategoryUseCase', () => {
  let useCase: FindCategoryUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
    };

    useCase = new FindCategoryUseCase(mockRepo);
  });

  it('deve retornar uma categoria existente', async () => {
    const categoryId = 1;
    const mockCategory = { id: 1, nome: 'Categoria A' };

    mockRepo.findById.mockResolvedValue(mockCategory);

    const result = await useCase.find(categoryId);

    expect(result).toEqual(mockCategory);
    expect(mockRepo.findById).toHaveBeenCalledWith(categoryId);
  });

  it('deve lançar NotFoundException se categoria não for encontrada', async () => {
    const categoryId = 999;

    mockRepo.findById.mockResolvedValue(undefined);

    await expect(useCase.find(categoryId)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(categoryId);
  });
});
