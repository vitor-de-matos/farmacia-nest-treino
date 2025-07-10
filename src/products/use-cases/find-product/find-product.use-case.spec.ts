import { IProductRepo } from 'src/products/models/interface/product-repo.interface';
import { FindProdutoUseCase } from './find-product.use-case';
import { ArchivesManagementJob } from 'src/shared/job/images-vids/archives-management.job';
import { Produto, TipoTarja } from 'src/products/models/entity/product.entity';
import { NotFoundException } from '@nestjs/common';

describe('FindProdutoUseCase', () => {
  let useCase: FindProdutoUseCase;
  let mockRepo: jest.Mocked<IProductRepo>;
  let mockArchives: jest.Mocked<ArchivesManagementJob>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
    } as unknown as jest.Mocked<IProductRepo>;

    mockArchives = {
      completeArchivePath: jest.fn(),
    } as unknown as jest.Mocked<ArchivesManagementJob>;

    useCase = new FindProdutoUseCase(mockRepo, mockArchives);
  });

  it('deve retornar um produto com URLs de mídia completas', async () => {
    const produto: Produto = {
      id: 1,
      name: 'Produto Teste',
      media: [{ url: 'img.jpg' }],
      description: 'teste',
      price: 100,
      labelType: TipoTarja.PRETA,
    } as Produto;

    mockRepo.findById.mockResolvedValue(produto);
    mockArchives.completeArchivePath.mockResolvedValue(
      'https://cdn.com/img.jpg',
    );

    const result = await useCase.find(1);

    expect(result.media[0].url).toBe('https://cdn.com/img.jpg');
    expect(mockRepo.findById).toHaveBeenCalledWith(1);
    expect(mockArchives.completeArchivePath).toHaveBeenCalledWith('img.jpg');
  });

  it('deve lançar NotFoundException se o produto não for encontrado', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.find(999)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(999);
  });
});
