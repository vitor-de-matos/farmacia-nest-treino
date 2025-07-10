import { FindProductDTO } from 'src/products/models/dto/find-product.dto';
import { FindAllProdutoController } from './find-all-product.controller';
import { FindAllProdutosUseCase } from './find-all-product.use-case';
import { Produto } from 'src/products/models/entity/product.entity';

describe('FindAllProdutoController', () => {
  let controller: FindAllProdutoController;
  let mockUseCase: jest.Mocked<FindAllProdutosUseCase>;

  beforeEach(() => {
    mockUseCase = {
      find: jest.fn(),
    } as unknown as jest.Mocked<FindAllProdutosUseCase>;

    controller = new FindAllProdutoController(mockUseCase);
  });

  it('deve retornar produtos paginados ao chamar find()', async () => {
    const queryDto: FindProductDTO = { name: 'Produto' } as FindProductDTO;

    const produtosMock: Produto[] = [
      {
        id: 1,
        name: 'Produto 1',
        media: [],
      } as Produto,
    ];

    const retornoMock = {
      data: produtosMock,
      currentPage: 1,
      totalPages: 1,
      totalItems: 1,
    };

    mockUseCase.find.mockResolvedValue(retornoMock);

    const result = await controller.find(queryDto);

    expect(result).toEqual(retornoMock);
    expect(mockUseCase.find).toHaveBeenCalledWith(queryDto);
  });
});
