import { IProductRepo } from 'src/products/models/interface/product-repo.interface';
import { UpdateProdutoUseCase } from './update-product.use-case';
import { CreateMidiaUseCase } from 'src/media/use-case/create-media/create-media.use-case';
import { UpdateProductDTO } from 'src/products/models/dto/update-product.dto';
import { Produto } from 'src/products/models/entity/product.entity';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('UpdateProdutoUseCase', () => {
  let useCase: UpdateProdutoUseCase;
  let mockRepo: jest.Mocked<IProductRepo>;
  let mockCreateMidia: jest.Mocked<CreateMidiaUseCase>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<IProductRepo>;

    mockCreateMidia = {
      create: jest.fn(),
    } as unknown as jest.Mocked<CreateMidiaUseCase>;

    useCase = new UpdateProdutoUseCase(mockRepo, mockCreateMidia);
  });

  it('deve atualizar o produto e criar mídias', async () => {
    const id = 1;
    const dto: UpdateProductDTO = {
      productName: 'Produto Atualizado',
      icon: ['true'],
    } as UpdateProductDTO;

    const file: Express.Multer.File = {
      originalname: 'imagem.jpg',
    } as Express.Multer.File;

    const produtoAtual: Produto = {
      id,
      name: 'Produto Original',
      media: [],
    } as Produto;

    const produtoAtualizado: Produto = {
      ...produtoAtual,
      name: dto.name,
    };

    mockRepo.findById.mockResolvedValue(produtoAtual);
    mockRepo.update.mockResolvedValue(produtoAtualizado);
    mockCreateMidia.create.mockResolvedValue(undefined);

    const result = await useCase.update(id, dto, [file]);

    expect(mockRepo.findById).toHaveBeenCalledWith(id);
    expect(mockCreateMidia.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: file.originalname,
        productId: id,
        icon: true,
      }),
    );
    expect(mockRepo.update).toHaveBeenCalledWith(id, dto);
    expect(result).toEqual(produtoAtualizado);
  });

  it('deve lançar NotFoundException se o produto não existir', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(
      useCase.update(999, {} as UpdateProductDTO, []),
    ).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(999);
  });

  it('deve lançar InternalServerErrorException se o update falhar', async () => {
    const id = 1;
    const dto = {} as UpdateProductDTO;
    const produtoExistente = { id, name: 'Produto' } as Produto;

    mockRepo.findById.mockResolvedValue(produtoExistente);
    mockRepo.update.mockResolvedValue(null);

    await expect(useCase.update(id, dto, [])).rejects.toThrow(
      InternalServerErrorException,
    );
    expect(mockRepo.update).toHaveBeenCalledWith(id, dto);
  });
});
