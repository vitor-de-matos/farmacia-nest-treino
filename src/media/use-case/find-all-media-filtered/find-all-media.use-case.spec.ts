import { FindMidiaDTO } from 'src/media/models/dtos/find-midia.dto';
import { FindAllMidiaUseCase } from './find-all-media.use-case';

describe('FindAllMidiaUseCase', () => {
  let useCase: FindAllMidiaUseCase;
  let mockRepo: any;
  let mockArchiveJob: any;

  beforeEach(() => {
    mockRepo = {
      find: jest.fn(),
    };

    mockArchiveJob = {
      completeArchivePath: jest.fn(),
    };

    useCase = new FindAllMidiaUseCase(mockRepo, mockArchiveJob);
  });

  it('deve buscar mídias e completar URLs', async () => {
    const dto: FindMidiaDTO = { page: 1, limit: 2 } as any;

    const media = {
      data: [
        { id: 1, url: 'midias/1.jpg' },
        { id: 2, url: 'midias/2.jpg' },
      ],
      currentPage: 1,
      totalPages: 1,
      totalItems: 2,
    };

    mockRepo.find.mockResolvedValue(media);
    mockArchiveJob.completeArchivePath.mockImplementation((url) =>
      Promise.resolve(`http://cdn/${url}`),
    );

    const result = await useCase.find(dto);

    expect(mockRepo.find).toHaveBeenCalledWith(dto);
    expect(result.data).toEqual([
      { id: 1, url: 'http://cdn/midias/1.jpg' },
      { id: 2, url: 'http://cdn/midias/2.jpg' },
    ]);
    expect(result.totalItems).toBe(2);
  });
});
