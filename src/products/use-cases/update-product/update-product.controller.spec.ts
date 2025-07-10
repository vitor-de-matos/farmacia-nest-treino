import { ArchivesManagementJob } from 'src/shared/job/images-vids/archives-management.job';
import { UpdateProdutoController } from './update-product.controller';
import { UpdateProdutoUseCase } from './update-product.use-case';
import { UpdateProductDTO } from 'src/products/models/dto/update-product.dto';
import { Produto } from 'src/products/models/entity/product.entity';
import { NotAcceptableException } from '@nestjs/common';

describe('UpdateProdutoController', () => {
  let controller: UpdateProdutoController;
  let mockUseCase: jest.Mocked<UpdateProdutoUseCase>;
  let mockArchiveService: jest.Mocked<ArchivesManagementJob>;

  beforeEach(() => {
    mockUseCase = {
      update: jest.fn(),
    } as unknown as jest.Mocked<UpdateProdutoUseCase>;

    mockArchiveService = {
      validateArchivesFile: jest.fn(),
    } as unknown as jest.Mocked<ArchivesManagementJob>;

    controller = new UpdateProdutoController(mockUseCase, mockArchiveService);
  });

  it('deve atualizar o produto com arquivos válidos', async () => {
    const id = 1;
    const dto: UpdateProductDTO = {
      productName: 'Novo Produto',
    } as UpdateProductDTO;

    const files: Express.Multer.File[] = [
      { originalname: 'img.jpg' } as Express.Multer.File,
    ];

    const produtoAtualizado: Produto = {
      id,
      name: 'Novo Produto',
      media: [],
    } as Produto;

    mockUseCase.update.mockResolvedValue(produtoAtualizado);

    const result = await controller.update(id, dto, files);

    expect(mockArchiveService.validateArchivesFile).toHaveBeenCalledWith(
      files[0],
    );
    expect(mockUseCase.update).toHaveBeenCalledWith(id, dto, files);
    expect(result).toEqual(produtoAtualizado);
  });

  it('deve lançar NotAcceptableException se o ID for inválido', async () => {
    const dto = {} as UpdateProductDTO;

    await expect(controller.update(undefined as any, dto, [])).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.update).not.toHaveBeenCalled();
  });

  it('não deve validar arquivos se a lista estiver vazia', async () => {
    const id = 2;
    const dto = {} as UpdateProductDTO;

    const produtoAtualizado: Produto = {
      id,
      name: 'Sem arquivos',
      media: [],
    } as Produto;

    mockUseCase.update.mockResolvedValue(produtoAtualizado);

    const result = await controller.update(id, dto, []);

    expect(mockArchiveService.validateArchivesFile).not.toHaveBeenCalled();
    expect(result).toEqual(produtoAtualizado);
  });
});
