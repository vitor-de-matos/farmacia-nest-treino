import { NotAcceptableException } from '@nestjs/common';
import { FindProdutoController } from './find-product.controller';
import { Produto, TipoTarja } from 'src/products/models/entity/product.entity';
import { FindProdutoUseCase } from './find-product.use-case';

describe('FindProdutoController', () => {
  let controller: FindProdutoController;
  let mockUseCase: jest.Mocked<FindProdutoUseCase>;

  beforeEach(() => {
    mockUseCase = {
      find: jest.fn(),
    } as unknown as jest.Mocked<FindProdutoUseCase>;

    controller = new FindProdutoController(mockUseCase);
  });

  it('deve retornar um produto ao receber um ID válido', async () => {
    const produto: Produto = {
      id: 1,
      name: 'Produto Teste',
      description: 'teste',
      price: 100,
      labelType: TipoTarja.PRETA,
      media: [],
    } as Produto;

    mockUseCase.find.mockResolvedValue(produto);

    const result = await controller.find(1);

    expect(result).toEqual(produto);
    expect(mockUseCase.find).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotAcceptableException se o ID não for válido', async () => {
    await expect(controller.find(undefined as any)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.find).not.toHaveBeenCalled();
  });
});
