import { UpdateCategoryController } from './update-category.controller';
import {
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

describe('UpdateCategoryController', () => {
  let controller: UpdateCategoryController;
  let mockUseCase: any;

  beforeEach(() => {
    mockUseCase = {
      update: jest.fn(),
    };

    controller = new UpdateCategoryController(mockUseCase);
  });

  it('deve atualizar a categoria com ID válido', async () => {
    const categoryId = 1;
    const dto = { name: 'Atualizada' };
    const mockUpdated = { id: 1, name: 'Atualizada' };

    mockUseCase.update.mockResolvedValue(mockUpdated);

    const result = await controller.update(categoryId, dto);

    expect(result).toEqual(mockUpdated);
    expect(mockUseCase.update).toHaveBeenCalledWith(categoryId, dto);
  });

  it('deve lançar NotAcceptableException se o ID não for numérico', async () => {
    const invalidId: any = 'abc';
    const dto = { name: 'Qualquer' };

    await expect(controller.update(invalidId, dto)).rejects.toThrow(
      NotAcceptableException,
    );
  });

  it('deve lançar NotFoundException se a categoria não for encontrada', async () => {
    const categoryId = 999;
    const dto = { name: 'Inexistente' };

    mockUseCase.update.mockRejectedValue(new NotFoundException());

    await expect(controller.update(categoryId, dto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('deve lançar InternalServerErrorException se houver erro interno', async () => {
    const categoryId = 1;
    const dto = { name: 'Erro' };

    mockUseCase.update.mockRejectedValue(new InternalServerErrorException());

    await expect(controller.update(categoryId, dto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
