import { Midia } from 'src/media/models/entity/midia.entity';
import { FindMidiaUseCase } from './find-media.use-case';

describe('FindMediaUseCase', () => {
  let useCase: FindMidiaUseCase;
  let mockRepo: any;
  let mockArchiveJob: any;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
    };

    mockArchiveJob = {
      completeArchivePath: jest.fn(),
    };

    useCase = new FindMidiaUseCase(mockRepo, mockArchiveJob);
  });

  it('deve retornar a mídia com URL completa', async () => {
    const mockMedia = {
      id: 1,
      name: 'midia',
      icon: true,
      createdAt: null,
      product: null,
      url: 'midias/1.jpg',
    } as Midia;

    mockRepo.findById.mockResolvedValue(mockMedia);
    mockArchiveJob.completeArchivePath.mockResolvedValue(
      'http://cdn/midias/1.jpg',
    );

    const result = await useCase.find(1);

    expect(mockRepo.findById).toHaveBeenCalledWith(1);
    expect(result.url).toBe('http://cdn/midias/1.jpg');
  });

  it('deve retornar a mídia diretamente se a URL já contém http', async () => {
    const mockMedia = {
      id: 2,
      name: 'midia',
      icon: false,
      url: 'http://cdn/midias/2.jpg',
      createdAt: null,
      product: null,
    } as Midia;

    mockRepo.findById.mockResolvedValue(mockMedia);

    const result = await useCase.find(2);

    expect(mockRepo.findById).toHaveBeenCalledWith(2);
    expect(mockArchiveJob.completeArchivePath).not.toHaveBeenCalled();
    expect(result).toEqual(mockMedia);
  });

  it('deve lançar erro se não conseguir completar a URL da mídia', async () => {
    const mockMedia = {
      id: 3,
      name: 'midia',
      icon: false,
      url: 'midias/3.jpg',
      createdAt: null,
      product: null,
    } as Midia;

    mockRepo.findById.mockResolvedValue(mockMedia);
    mockArchiveJob.completeArchivePath.mockResolvedValue(null);

    await expect(useCase.find(3)).rejects.toThrow(
      'Erro ao gerar o caminho do arquivo',
    );
  });

  it('deve lançar erro se mídia não for encontrada', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.find(999)).rejects.toThrow('Mídia não encontrada');
  });
});
