import { CreateCategoryController } from './create-category.controller';
import { CreateCategoryUseCase } from './create-category.use-case';
import { BadRequestException } from '@nestjs/common';

describe('CreateCategoryController', () => {
  let controller: CreateCategoryController;
  let mockUseCase: CreateCategoryUseCase;

  beforeEach(() => {
    mockUseCase = {
      create: jest.fn(),
    } as any;

    controller = new CreateCategoryController(mockUseCase);
  });

  it('deve retornar o ID da categoria criada', async () => {
    (mockUseCase.create as jest.Mock).mockResolvedValue(200);
    const dto = { name: 'Categoria Teste' } as any;

    const result = await controller.create(dto);

    expect(result).toBe(200);
    expect(mockUseCase.create).toHaveBeenCalledWith(dto);
  });

  it('deve propagar exceção do use-case', async () => {
    (mockUseCase.create as jest.Mock).mockRejectedValue(
      new BadRequestException('Erro simulado'),
    );

    await expect(controller.create({} as any)).rejects.toThrow(
      BadRequestException,
    );
  });
});
