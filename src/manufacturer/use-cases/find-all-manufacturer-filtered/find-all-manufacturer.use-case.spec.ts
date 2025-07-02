import { FindManufacturerDTO } from 'src/manufacturer/models/dtos/find-manufacturer.dto';
import { FindAllManufacturerUseCase } from './find-all-manufacturer.use-case';
import { Fabricante } from 'src/manufacturer/models/entity/manufacturer.entity';

describe('FindAllManufacturerUseCase', () => {
  let useCase: FindAllManufacturerUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      find: jest.fn(),
    };

    useCase = new FindAllManufacturerUseCase(mockRepo);
  });

  it('deve retornar fabricantes com paginação', async () => {
    const dto: FindManufacturerDTO = {
      page: 1,
      quantity: 10,
    };

    const expected = {
      data: [{ id: 1, name: 'Fabricante A' } as Fabricante],
      currentPage: 1,
      totalPages: 1,
      totalItems: 1,
    };

    mockRepo.find.mockResolvedValue(expected);

    const result = await useCase.find(dto);

    expect(result).toEqual(expected);
    expect(mockRepo.find).toHaveBeenCalledWith(dto);
  });
});
