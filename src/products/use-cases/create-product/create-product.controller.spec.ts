import { CreateProdutoController } from './create-product.controller';
import { ArchivesManagementJob } from 'src/shared/job/images-vids/archives-management.job';
import { CreateProdutoUseCase } from './create-product.use-case';
import { BadRequestException } from '@nestjs/common';
import { CreateProductDTO } from 'src/products/models/dto/create-product.dto';

describe('CreateProdutoController', () => {
  let controller: CreateProdutoController;
  let mockUseCase: CreateProdutoUseCase;
  let mockArchivesJob: ArchivesManagementJob;

  beforeEach(() => {
    mockUseCase = {
      create: jest.fn(),
    } as unknown as CreateProdutoUseCase;

    mockArchivesJob = {
      validateArchivesFile: jest.fn(),
    } as unknown as ArchivesManagementJob;

    controller = new CreateProdutoController(mockUseCase, mockArchivesJob);
  });

  it('deve criar produto com sucesso e validar arquivos', async () => {
    const dto: CreateProductDTO = {
      nome: 'Produto X',
      descricao: 'Teste',
      valor: 100,
      categoryId: 1,
      manufacturerId: 2,
    } as any;

    const mockFiles = [
      {
        originalname: 'imagem.jpg',
        buffer: Buffer.from(''),
        mimetype: 'image/jpeg',
      },
    ] as Express.Multer.File[];

    (mockUseCase.create as jest.Mock).mockResolvedValue(101);

    const result = await controller.create(dto, mockFiles);

    expect(mockArchivesJob.validateArchivesFile).toHaveBeenCalledTimes(1);
    expect(mockArchivesJob.validateArchivesFile).toHaveBeenCalledWith(
      mockFiles[0],
    );
    expect(mockUseCase.create).toHaveBeenCalledWith(dto, mockFiles);
    expect(result).toBe(101);
  });

  it('deve lançar BadRequestException se arquivos não forem enviados', async () => {
    const dto: CreateProductDTO = {
      nome: 'Produto Y',
      descricao: 'Sem arquivos',
      valor: 200,
      categoryId: 1,
      manufacturerId: 2,
    } as any;

    await expect(controller.create(dto, [])).rejects.toThrow(
      BadRequestException,
    );
    expect(mockUseCase.create).not.toHaveBeenCalled();
    expect(mockArchivesJob.validateArchivesFile).not.toHaveBeenCalled();
  });
});
