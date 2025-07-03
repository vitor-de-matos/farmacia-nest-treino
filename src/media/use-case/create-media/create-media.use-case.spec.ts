import { CreateMidiaDTO } from 'src/media/models/dtos/create-midia.dto';
import { CreateMidiaUseCase } from './create-media.use-case';
import { BadRequestException } from '@nestjs/common';

describe('CreateMidiaUseCase', () => {
  let useCase: CreateMidiaUseCase;
  let mockMediaRepo: any;
  let mockProductRepo: any;
  let mockArchiveJob: any;

  beforeEach(() => {
    mockMediaRepo = {
      create: jest.fn(),
      update: jest.fn(),
    };

    mockProductRepo = {
      findById: jest.fn().mockResolvedValue({ media: [] }),
    };

    mockArchiveJob = {
      validateArchivesFile: jest.fn(),
      saveArchivesInFileSystem: jest.fn().mockResolvedValue('midias/foto.png'),
      persistToMediaStorage: jest.fn(),
    };

    useCase = new CreateMidiaUseCase(
      mockMediaRepo,
      mockProductRepo,
      mockArchiveJob,
    );
  });

  const dto: CreateMidiaDTO = {
    name: 'Imagem Exemplo',
    productId: 1,
    icon: true,
    archive: {
      buffer: Buffer.from('imagem'),
      mimetype: 'image/png',
      originalname: 'foto.png',
      size: 1000,
      fieldname: 'file',
      encoding: '7bit',
      stream: null,
      destination: '',
      filename: '',
      path: '',
    } as any,
  };

  it('deve criar uma mídia com sucesso', async () => {
    mockProductRepo.findById.mockResolvedValue({ media: [] });
    mockMediaRepo.create.mockResolvedValue(123);
    mockMediaRepo.update.mockResolvedValue(undefined);
    mockArchiveJob.validateArchivesFile.mockReturnValue(undefined);
    mockArchiveJob.saveArchivesInFileSystem.mockResolvedValue(
      'midias/foto.png',
    );
    mockArchiveJob.persistToMediaStorage.mockResolvedValue(undefined);

    const result = await useCase.create(dto);

    expect(result).toBe(123);
    expect(mockProductRepo.findById).toHaveBeenCalledWith(1);
    expect(mockMediaRepo.create).toHaveBeenCalledWith({
      name: 'Imagem Exemplo',
      productId: 1,
      icon: true,
    });
    expect(mockArchiveJob.validateArchivesFile).toHaveBeenCalledWith(
      dto.archive,
    );
  });

  it('deve lançar BadRequestException se nenhum ID de relacionamento for enviado', async () => {
    const invalidDto = {
      name: 'Sem ID',
      archive: {} as any,
    };

    await expect(useCase.create(invalidDto as any)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('deve lançar erro se o produto já possuir um ícone e mediaDTO.icon for true', async () => {
    const dtoComIcone = {
      name: 'Imagem com ícone',
      productId: 1,
      icon: true,
    } as CreateMidiaDTO;

    mockProductRepo.findById.mockResolvedValue({
      media: [{ id: 999, icon: true }],
    });

    await expect(useCase.create(dtoComIcone)).rejects.toThrow(
      new BadRequestException({
        message: 'Produto ja possui um icone',
      }),
    );
  });
});
