import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateProdutoUseCase } from './create-product.use-case';
import { CreateMidiaUseCase } from 'src/media/use-case/create-media/create-media.use-case';
import { IManufacturerRepo } from 'src/manufacturer/models/interface/manufacturer-repo.interface';
import { CreateProductDTO } from 'src/products/models/dto/create-product.dto';
import { ICategoryRepo } from 'src/category/models/interface/category-repo.interface';
import { IProductRepo } from 'src/products/models/interface/product-repo.interface';

describe('CreateProdutoUseCase', () => {
  let useCase: CreateProdutoUseCase;
  let productRepo: jest.Mocked<IProductRepo>;
  let categoryRepo: jest.Mocked<ICategoryRepo>;
  let manufacturerRepo: jest.Mocked<IManufacturerRepo>;
  let midiaUseCase: jest.Mocked<CreateMidiaUseCase>;

  beforeEach(() => {
    productRepo = { create: jest.fn() } as any;
    categoryRepo = { findById: jest.fn() } as any;
    manufacturerRepo = { findById: jest.fn() } as any;
    midiaUseCase = { create: jest.fn() } as any;

    useCase = new CreateProdutoUseCase(
      productRepo,
      categoryRepo,
      manufacturerRepo,
      midiaUseCase,
    );
  });

  it('deve criar um produto com sucesso', async () => {
    const dto: CreateProductDTO = {
      nome: 'Produto Teste',
      descricao: 'Descrição',
      valor: 100,
      categoryId: 1,
      manufacturerId: 2,
      icon: ['true'],
    } as any;

    const mockArchives = [
      {
        originalname: 'file.jpg',
        buffer: Buffer.from(''),
        mimetype: 'image/jpeg',
      },
    ] as Express.Multer.File[];

    categoryRepo.findById.mockResolvedValue({
      id: 1,
      name: 'categoria',
      products: null,
    });
    manufacturerRepo.findById.mockResolvedValue({
      id: 2,
      name: 'fabricante',
      cnpj: '12345678901234',
      contact: '98989898',
      products: null,
    });
    productRepo.create.mockResolvedValue(123);
    midiaUseCase.create.mockResolvedValue(undefined);

    const result = await useCase.create(dto, mockArchives);

    expect(result).toBe(123);
    expect(categoryRepo.findById).toHaveBeenCalledWith(1);
    expect(manufacturerRepo.findById).toHaveBeenCalledWith(2);
    expect(productRepo.create).toHaveBeenCalledWith(dto);
    expect(midiaUseCase.create).toHaveBeenCalled();
  });

  it('deve lançar NotFoundException se categoria não existir', async () => {
    const dto = { categoryId: 99, manufacturerId: 1 } as any;
    categoryRepo.findById.mockResolvedValue(null);

    await expect(useCase.create(dto, [])).rejects.toThrow(NotFoundException);
  });

  it('deve lançar NotFoundException se fabricante não existir', async () => {
    const dto = { categoryId: 1, manufacturerId: 99 } as any;
    categoryRepo.findById.mockResolvedValue({
      id: 1,
      name: 'teste',
      products: null,
    });
    manufacturerRepo.findById.mockResolvedValue(null);

    await expect(useCase.create(dto, [])).rejects.toThrow(NotFoundException);
  });

  it('deve lançar BadRequestException se retorno do repositório for inválido', async () => {
    const dto = { categoryId: 1, manufacturerId: 1 } as any;
    categoryRepo.findById.mockResolvedValue({
      id: 1,
      name: 'teste',
      products: null,
    });
    manufacturerRepo.findById.mockResolvedValue({
      id: 1,
      name: 'teste',
      cnpj: '12345678901234',
      contact: '89898989',
      products: null,
    });
    productRepo.create.mockResolvedValue(NaN);

    await expect(useCase.create(dto, [])).rejects.toThrow(BadRequestException);
  });
});
