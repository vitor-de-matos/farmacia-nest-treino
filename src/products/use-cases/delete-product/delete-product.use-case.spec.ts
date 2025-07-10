import { IProductRepo } from 'src/products/models/interface/product-repo.interface';
import { DeleteProdutoUseCase } from './delete-product.use-case';
import { DeleteMidiaUseCase } from 'src/media/use-case/delete-media/delete-media.use-case';
import { TipoTarja } from 'src/products/models/entity/product.entity';
import { NotFoundException } from '@nestjs/common';

describe('DeleteProdutoUseCase', () => {
  let useCase: DeleteProdutoUseCase;
  let productRepo: jest.Mocked<IProductRepo>;
  let mediaService: jest.Mocked<DeleteMidiaUseCase>;

  beforeEach(() => {
    productRepo = {
      findById: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<IProductRepo>;

    mediaService = {
      delete: jest.fn(),
    } as unknown as jest.Mocked<DeleteMidiaUseCase>;

    useCase = new DeleteProdutoUseCase(productRepo, mediaService);
  });

  it('deve deletar um produto e suas mídias com sucesso', async () => {
    const product = {
      id: 1,
      name: 'teste',
      description: 'testado',
      price: 100,
      labelType: TipoTarja.SEM_TARJA,
      controlled: false,
      createdAt: null,
      updatedAt: null,
      batches: null,
      batchPromotions: null,
      itemsSold: null,
      category: null,
      manufacturer: null,
      media: [
        {
          id: 101,
          name: 'midia1',
          icon: true,
          url: 'fff',
          createdAt: null,
          product: null,
        },
        {
          id: 102,
          name: 'midia2',
          icon: false,
          url: 'fff',
          createdAt: null,
          product: null,
        },
      ],
    };

    productRepo.findById.mockResolvedValue(product);
    productRepo.delete.mockResolvedValue(undefined);
    mediaService.delete.mockResolvedValue(undefined);

    await expect(useCase.delete(1)).resolves.toBeUndefined();

    expect(productRepo.findById).toHaveBeenCalledWith(1);
    expect(mediaService.delete).toHaveBeenCalledTimes(2);
    expect(mediaService.delete).toHaveBeenCalledWith(101);
    expect(mediaService.delete).toHaveBeenCalledWith(102);
    expect(productRepo.delete).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotFoundException se produto não existir', async () => {
    productRepo.findById.mockResolvedValue(null);

    await expect(useCase.delete(99)).rejects.toThrow(NotFoundException);
    expect(productRepo.delete).not.toHaveBeenCalled();
    expect(mediaService.delete).not.toHaveBeenCalled();
  });
});
