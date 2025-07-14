import { DeleteMidiaUseCase } from './delete-media.use-case';
import { NotFoundException } from '@nestjs/common';

describe('DeleteMidiaUseCase', () => {
  let useCase: DeleteMidiaUseCase;
  let mockRepo: any;
  let mockArchiveJob: any;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      delete: jest.fn(),
    };

    mockArchiveJob = {
      removeArchivesFromFileSystem: jest.fn(),
    };

    useCase = new DeleteMidiaUseCase(mockRepo, mockArchiveJob);
  });

  it('deve lançar NotFoundException se mídia não for encontrada', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.delete(1)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(1);
    expect(mockRepo.delete).not.toHaveBeenCalled();
  });

  it('deve remover arquivo do sistema se url for local', async () => {
    const media = { id: 1, url: 'midias/foto.jpg' };
    mockRepo.findById.mockResolvedValue(media);

    await useCase.delete(1);

    expect(mockArchiveJob.removeArchivesFromFileSystem).toHaveBeenCalledWith(
      'midias/foto.jpg',
    );
    expect(mockRepo.delete).toHaveBeenCalledWith(1);
  });

  it('não deve remover arquivo se url for externa (http)', async () => {
    const media = { id: 2, url: 'http://cdn.site.com/foto.jpg' };
    mockRepo.findById.mockResolvedValue(media);

    await useCase.delete(2);

    expect(mockArchiveJob.removeArchivesFromFileSystem).not.toHaveBeenCalled();
    expect(mockRepo.delete).toHaveBeenCalledWith(2);
  });
});
