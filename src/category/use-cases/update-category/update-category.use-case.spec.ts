import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCategoryUseCase } from './update-category.use-case';

describe('UpdateCategoryUseCase', () => {
  let useCase: UpdateCategoryUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      update: jest.fn(),
    };

    useCase = new UpdateCategoryUseCase(mockRepo);
  });

  it('deve atualizar uma categoria existente', async () => {
    const categoryId = 1;
    const dto = { name: 'Nova Categoria' };
    const existingCategory = { id: 1, name: 'Categoria Antiga' };
    const updatedCategory = { id: 1, name: 'Nova Categoria' };

    mockRepo.findById.mockResolvedValue(existingCategory);
    mockRepo.update.mockResolvedValue(updatedCategory);

    const result = await useCase.update(categoryId, dto);

    expect(result).toEqual(updatedCategory);
    expect(mockRepo.findById).toHaveBeenCalledWith(categoryId);
    expect(mockRepo.update).toHaveBeenCalledWith(categoryId, dto);
  });

  it('deve lançar NotFoundException se a categoria não existir', async () => {
    const categoryId = 999;
    const dto = { name: 'Qualquer' };

    mockRepo.findById.mockResolvedValue(undefined);

    await expect(useCase.update(categoryId, dto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('deve lançar InternalServerErrorException se a atualização falhar', async () => {
    const categoryId = 1;
    const dto = { name: 'Nova Categoria' };
    const existingCategory = { id: 1, name: 'Antiga' };

    mockRepo.findById.mockResolvedValue(existingCategory);
    mockRepo.update.mockResolvedValue(null);

    await expect(useCase.update(categoryId, dto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
