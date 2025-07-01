import { FindAllBatchController } from './find-all-batchs.controller';
import { FindAllBatchUseCase } from './find-all-batchs.use-case';

describe('FindAllBatchController', () => {
  let controller: FindAllBatchController;
  let mockUseCase: FindAllBatchUseCase;

  beforeEach(() => {
    mockUseCase = {
      find: jest.fn(),
    } as any;

    controller = new FindAllBatchController(mockUseCase);
  });

  it('deve retornar os lotes com paginação', async () => {
    const filtro = { page: 1, limit: 5 } as any;
    const resultadoEsperado = {
      data: [{ id: 1, code: 'Lote A' }],
      currentPage: 1,
      totalPages: 1,
      totalItems: 1,
    };

    (mockUseCase.find as jest.Mock).mockResolvedValue(resultadoEsperado);

    const result = await controller.find(filtro);

    expect(result).toEqual(resultadoEsperado);
    expect(mockUseCase.find).toHaveBeenCalledWith(filtro);
  });
});
