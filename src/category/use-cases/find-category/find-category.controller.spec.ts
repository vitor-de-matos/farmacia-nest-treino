import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { FindCategoryController } from './find-category.controller';

describe('FindCategoryController', () => {
  let controller: FindCategoryController;
  let mockUseCase: any;

  beforeEach(() => {
    mockUseCase = {
      find: jest.fn(),
    };

    controller = new FindCategoryController(mockUseCase);
  });

  it('deve retornar a categoria pelo ID válido', async () => {
    const categoryId = 1;
    const mockCategory = { id: 1, nome: 'Categoria A' };

    mockUseCase.find.mockResolvedValue(mockCategory);

    const result = await controller.find(categoryId);

    expect(result).toEqual(mockCategory);
    expect(mockUseCase.find).toHaveBeenCalledWith(categoryId);
  });

  it('deve lançar NotAcceptableException se o ID não for numérico', async () => {
    const invalidId: any = 'abc';

    await expect(controller.find(invalidId)).rejects.toThrow(
      NotAcceptableException,
    );
  });

  it('deve lançar NotFoundException se a categoria não for encontrada', async () => {
    const categoryId = 999;

    mockUseCase.find.mockRejectedValue(new NotFoundException());

    await expect(controller.find(categoryId)).rejects.toThrow(
      NotFoundException,
    );
    expect(mockUseCase.find).toHaveBeenCalledWith(categoryId);
  });
});
