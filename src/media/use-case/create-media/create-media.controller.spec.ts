import { CreateMidiaController } from './create-media.controller';
import { CreateMidiaUseCase } from './create-media.use-case';
import { ArchivesManagementJob } from 'src/shared/job/images-vids/archives-management.job';
import { BadRequestException } from '@nestjs/common';

describe('CreateMidiaController', () => {
  let controller: CreateMidiaController;
  let mockUseCase: jest.Mocked<CreateMidiaUseCase>;
  let mockArchiveJob: jest.Mocked<ArchivesManagementJob>;

  beforeEach(() => {
    mockUseCase = {
      create: jest.fn(),
    } as any;

    mockArchiveJob = {
      validateArchivesFile: jest.fn(),
    } as any;

    controller = new CreateMidiaController(mockUseCase, mockArchiveJob);
  });

  it('deve criar mídia com URL e retornar ID', async () => {
    const dto = {
      name: 'Imagem com URL',
      productId: 1,
      url: 'http://exemplo.com/foto.jpg',
    };

    mockUseCase.create.mockResolvedValue(10);

    const result = await controller.create(dto as any, undefined);

    expect(mockUseCase.create).toHaveBeenCalledWith(dto);
    expect(result).toBe(10);
  });

  it('deve validar o arquivo e repassar ao use case', async () => {
    const dto = {
      name: 'Imagem com arquivo',
      productId: 1,
    };

    const file = {
      originalname: 'foto.png',
      mimetype: 'image/png',
      buffer: Buffer.from('fake-data'),
    } as any;

    mockUseCase.create.mockResolvedValue(20);

    const result = await controller.create(dto as any, file);

    expect(mockArchiveJob.validateArchivesFile).toHaveBeenCalledWith(file);
    expect(mockUseCase.create).toHaveBeenCalledWith({
      ...dto,
      archive: file,
    });
    expect(result).toBe(20);
  });

  it('deve lançar BadRequestException se nem arquivo nem url forem enviados', async () => {
    const dto = {
      name: 'Inválido',
      productId: 1,
    };

    await expect(controller.create(dto as any, undefined)).rejects.toThrow(
      BadRequestException,
    );
  });
});
