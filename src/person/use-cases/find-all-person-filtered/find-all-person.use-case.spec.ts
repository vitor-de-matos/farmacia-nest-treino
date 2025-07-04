import { IPersonRepo } from 'src/person/models/interface/person-repo.interface';
import { FindAllPersonUseCase } from './find-all-person.use-case';
import { FindPersonDTO } from 'src/person/models/dtos/find-person.dto';
import { Pessoa } from 'src/person/models/entity/person.entity';

describe('FindAllPersonUseCase', () => {
  let useCase: FindAllPersonUseCase;
  let mockRepo: jest.Mocked<IPersonRepo>;

  beforeEach(() => {
    mockRepo = {
      find: jest.fn(),
    } as unknown as jest.Mocked<IPersonRepo>;

    useCase = new FindAllPersonUseCase(mockRepo);
  });

  it('deve retornar lista paginada de pessoas', async () => {
    const dto: FindPersonDTO = { page: 1, quantity: 10 };
    const mockResponse = {
      data: [
        { id: 1, name: 'João' } as Pessoa,
        { id: 2, name: 'Maria' } as Pessoa,
      ],
      currentPage: 1,
      totalPages: 1,
      totalItems: 2,
    };

    mockRepo.find.mockResolvedValue(mockResponse);

    const result = await useCase.find(dto);

    expect(result).toEqual(mockResponse);
    expect(mockRepo.find).toHaveBeenCalledWith(dto);
  });
});
