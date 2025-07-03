import { FindAllMidiaController } from "./find-all-media.controller";
import { FindAllMidiaUseCase } from "./find-all-media.use-case";

describe('FindAllMidiaController', () => {
  let controller: FindAllMidiaController;
  let mockUseCase: jest.Mocked<FindAllMidiaUseCase>;

  beforeEach(() => {
    mockUseCase = {
      find: jest.fn(),
    } as any;

    controller = new FindAllMidiaController(mockUseCase);
  });

  it('deve retornar a lista paginada de mídias', async () => {
    const dto = { page: 1, limit: 10 } as any;

    const resultMock = {
      data: [{ id: 1, url: 'http://cdn/midias/1.jpg',name:'',icon:true, createdAt:null,product:null }],
      currentPage: 1,
      totalPages: 1,
      totalItems: 1,
    };

    mockUseCase.find.mockResolvedValue(resultMock);

    const result = await controller.find(dto);

    expect(mockUseCase.find).toHaveBeenCalledWith(dto);
    expect(result).toEqual(resultMock);
  });
});
