import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { DeleteCategoryController } from './delete-category.controller';
import { DeleteCategoryUseCase } from './delete-category.use-case';

describe('DeleteCategoryController', () => {
  let controller: DeleteCategoryController;
  let mockUseCase: DeleteCategoryUseCase;

  beforeEach(() => {
    mockUseCase = {
      delete: jest.fn(),
    } as any;

    controller = new DeleteCategoryController(mockUseCase);
  });

  it('deve deletar a categoria e retornar mensagem de sucesso', async () => {
    (mockUseCase.delete as jest.Mock).mockResolvedValue(undefined);

    const result = await controller.delete(1);

    expect(result).toBe('Categoria removida com sucesso');
    expect(mockUseCase.delete).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotAcceptableException se o ID for inválido', async () => {
    await expect(controller.delete(NaN)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.delete).not.toHaveBeenCalled();
  });

  it('deve propagar erro do use-case (ex: NotFoundException)', async () => {
    (mockUseCase.delete as jest.Mock).mockRejectedValue(
      new NotFoundException(),
    );

    await expect(controller.delete(999)).rejects.toThrow(NotFoundException);
  });
});
