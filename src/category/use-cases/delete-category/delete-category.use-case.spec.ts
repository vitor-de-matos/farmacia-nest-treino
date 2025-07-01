import { NotFoundException } from '@nestjs/common';
import { DeleteCategoryUseCase } from './delete-category.use-case';

describe('DeleteCategoryUseCase', () => {
  let useCase: DeleteCategoryUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new DeleteCategoryUseCase(mockRepo);
  });

  it('deve excluir a categoria se ela existir', async () => {
    mockRepo.findById.mockResolvedValue({ id: 1 });
    mockRepo.delete.mockResolvedValue(undefined);

    await useCase.delete(1);

    expect(mockRepo.findById).toHaveBeenCalledWith(1);
    expect(mockRepo.delete).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotFoundException se a categoria não for encontrada', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.delete(99)).rejects.toThrow(NotFoundException);
    expect(mockRepo.delete).not.toHaveBeenCalled();
  });
});
