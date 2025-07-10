import { IMidiaRepo } from 'src/media/models/interface/midia-repo.interface';
import { UpdateMidiaUseCase } from './update-media.use-case';
import { IProductRepo } from 'src/products/models/interface/product-repo.interface';
import { ArchivesManagementJob } from 'src/shared/job/images-vids/archives-management.job';
import { TipoTarja } from 'src/products/models/entity/product.entity';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('UpdateMidiaUseCase', () => {
  let useCase: UpdateMidiaUseCase;
  let mediaRepository: jest.Mocked<IMidiaRepo>;
  let productRepository: jest.Mocked<IProductRepo>;
  let archivesJob: jest.Mocked<ArchivesManagementJob>;

  const mockProductBase = {
    id: 10,
    media: [],
    name: 'Produto Teste',
    description: 'Descrição',
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
  };

  const mockMidiaBase = {
    id: 1,
    name: 'Midia Teste',
    icon: true,
    url: 'teste.jpg',
    createdAt: null,
    product: mockProductBase,
  };

  const mockFile = {
    originalname: 'arquivo.jpg',
    buffer: Buffer.from('fakefiledata'),
    size: 1234,
    mimetype: 'image/jpeg',
  };

  beforeEach(() => {
    mediaRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    } as any;

    productRepository = {
      findById: jest.fn(),
    } as any;

    archivesJob = {
      validateArchivesFile: jest.fn(),
      saveArchivesInFileSystem: jest
        .fn()
        .mockResolvedValue('mock/path/to/file'),
      removeArchivesFromFileSystem: jest.fn(),
    } as unknown as jest.Mocked<ArchivesManagementJob>;

    useCase = new UpdateMidiaUseCase(
      mediaRepository,
      productRepository,
      archivesJob,
    );
  });

  it('deve lançar NotFoundException se a mídia não for encontrada', async () => {
    mediaRepository.findById.mockResolvedValue(null);

    await expect(useCase.update(1, {} as any)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('deve chamar mediaRepository.update com os dados corretos', async () => {
    mediaRepository.findById.mockResolvedValue({ ...mockMidiaBase });
    productRepository.findById.mockResolvedValue({ ...mockProductBase });
    mediaRepository.update.mockResolvedValue({ ...mockMidiaBase });

    const dto = {
      title: 'Nova mídia',
      productId: 10,
    };

    await useCase.update(1, dto as any);

    expect(mediaRepository.update).toHaveBeenCalledWith(1, dto);
  });

  it('deve processar o arquivo se enviado no DTO', async () => {
    mediaRepository.findById.mockResolvedValue({ ...mockMidiaBase });
    productRepository.findById.mockResolvedValue({ ...mockProductBase });
    mediaRepository.update.mockResolvedValue({ ...mockMidiaBase });

    const dto = {
      archive: mockFile,
      productId: 10,
    };

    await useCase.update(1, dto as any);

    expect(archivesJob.validateArchivesFile).toHaveBeenCalledWith(mockFile);
    expect(archivesJob.saveArchivesInFileSystem).toHaveBeenCalledWith(
      1,
      mockFile,
    );
    expect(mediaRepository.update).toHaveBeenCalled();
  });

  it('deve lançar BadRequestException se o produto já possui ícone e DTO também define icon como true', async () => {
    const productWithIcon = {
      ...mockProductBase,
      media: [
        {
          id: 99,
          icon: true,
          name: 'teste',
          url: 'teste',
          createdAt: null,
          product: null,
        },
      ],
    };

    mediaRepository.findById.mockResolvedValue({ ...mockMidiaBase });
    productRepository.findById.mockResolvedValue(productWithIcon);

    const dto = {
      icon: true,
      productId: 10,
    };

    await expect(useCase.update(1, dto as any)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('deve lançar InternalServerErrorException se mediaRepository.update retornar false', async () => {
    mediaRepository.findById.mockResolvedValue({ ...mockMidiaBase });
    productRepository.findById.mockResolvedValue({ ...mockProductBase });
    mediaRepository.update.mockResolvedValue(undefined);

    const dto = {
      title: 'Nova mídia',
      productId: 10,
    };

    await expect(useCase.update(1, dto as any)).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('deve remover arquivo do sistema se uma nova URL for passada e a anterior não for externa', async () => {
    const localMidia = {
      ...mockMidiaBase,
      url: 'local/path/to/file.jpg',
    };

    mediaRepository.findById.mockResolvedValue(localMidia);
    productRepository.findById.mockResolvedValue(mockProductBase);
    mediaRepository.update.mockResolvedValue({
      ...localMidia,
      url: 'nova-url.jpg',
    });

    const dto = {
      url: 'nova-url.jpg',
      productId: 10,
    };

    await useCase.update(1, dto as any);

    expect(archivesJob.removeArchivesFromFileSystem).toHaveBeenCalledWith(
      'local/path/to/file.jpg',
    );
  });

  it('deve atualizar apenas o campo "icon" quando definido e nenhum arquivo for enviado', async () => {
    mediaRepository.findById.mockResolvedValue(mockMidiaBase);
    productRepository.findById.mockResolvedValue(mockProductBase);
    mediaRepository.update.mockResolvedValue({
      ...mockMidiaBase,
      icon: false,
    });

    const dto = {
      icon: false,
      productId: 10,
    };

    await useCase.update(1, dto as any);

    expect(mediaRepository.update).toHaveBeenCalledWith(
      1,
      expect.objectContaining({ icon: false }),
    );
  });

  it('deve lançar InternalServerErrorException se a atualização final da mídia falhar', async () => {
    mediaRepository.findById.mockResolvedValue(mockMidiaBase);
    productRepository.findById.mockResolvedValue(mockProductBase);

    mediaRepository.update.mockResolvedValue(undefined);

    const dto = {
      title: 'Novo título',
      productId: 10,
    };

    await expect(useCase.update(1, dto as any)).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  //it('deve lançar BadRequestException se mais de um campo de ID for enviado', async () => {
  //  mediaRepository.findById.mockResolvedValue(mockMidiaBase);
  //
  //  const dto = {
  //    productId: 10,
  //    categoryId: 5,
  //    media: [],
  //  };
  //
  //  await expect(useCase.update(1, dto as any)).rejects.toThrow(
  //    BadRequestException,
  //  );
  //});

  // essa verificação impedirá que múltiplos relacionamentos sejam enviados ao mesmo tempo.
});
