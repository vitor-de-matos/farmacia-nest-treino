import { IProductRepo } from 'src/products/models/interface/product-repo.interface';
import { FindAllProdutosUseCase } from './find-all-product.use-case';
import { ArchivesManagementJob } from 'src/shared/job/images-vids/archives-management.job';
import { FindProductDTO } from 'src/products/models/dto/find-product.dto';
import { Produto, TipoTarja } from 'src/products/models/entity/product.entity';

describe('FindAllProdutosUseCase', () => {
  let useCase: FindAllProdutosUseCase;
  let mockRepo: jest.Mocked<IProductRepo>;
  let mockArchives: jest.Mocked<ArchivesManagementJob>;

  beforeEach(() => {
    mockRepo = {
      find: jest.fn(),
    } as unknown as jest.Mocked<IProductRepo>;

    mockArchives = {
      completeArchivePath: jest.fn(),
    } as unknown as jest.Mocked<ArchivesManagementJob>;

    useCase = new FindAllProdutosUseCase(mockRepo, mockArchives);
  });

  it('deve retornar produtos com URLs completas de mídia', async () => {
    const dto: FindProductDTO = { name: 'Teste' } as FindProductDTO;

    const produtos: Produto[] = [
      {
        id: 1,
        name: 'Produto A',
        media: [{ url: 'image1.jpg' }],
        description: 'test',
        price: 100,
        labelType: TipoTarja.SEM_TARJA,
      } as Produto,
    ];

    mockRepo.find.mockResolvedValue({
      data: produtos,
      currentPage: 1,
      totalItems: 1,
      totalPages: 1,
    });

    mockArchives.completeArchivePath.mockResolvedValue(
      'https://cdn.com/image1.jpg',
    );

    const result = await useCase.find(dto);

    expect(result.data[0].media[0].url).toBe('https://cdn.com/image1.jpg');
    expect(mockRepo.find).toHaveBeenCalledWith(dto);
    expect(mockArchives.completeArchivePath).toHaveBeenCalledWith('image1.jpg');
  });

  it('deve lidar com produtos sem mídia', async () => {
    const dto: FindProductDTO = {} as FindProductDTO;

    const produtos: Produto[] = [
      {
        id: 2,
        name: 'Produto Sem Mídia',
        media: [],
        description: 'test',
        price: 100,
        labelType: TipoTarja.SEM_TARJA,
      } as Produto,
    ];

    mockRepo.find.mockResolvedValue({
      data: produtos,
      currentPage: 1,
      totalItems: 1,
      totalPages: 1,
    });

    const result = await useCase.find(dto);

    expect(result.data[0].media.length).toBe(0);
    expect(mockArchives.completeArchivePath).not.toHaveBeenCalled();
  });
});
