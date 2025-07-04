import { FindPersonDTO } from 'src/person/models/dtos/find-person.dto';
import { FindAllPersonController } from './find-all-person.controller';
import { FindAllPersonUseCase } from './find-all-person.use-case';
import { Pessoa } from 'src/person/models/entity/person.entity';

describe('FindAllPersonController', () => {
  let controller: FindAllPersonController;
  let useCase: FindAllPersonUseCase;

  beforeEach(() => {
    useCase = {
      find: jest.fn(),
    } as unknown as FindAllPersonUseCase;

    controller = new FindAllPersonController(useCase);
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

    (useCase.find as jest.Mock).mockResolvedValue(mockResponse);

    const result = await controller.find(dto);

    expect(result).toEqual(mockResponse);
    expect(useCase.find).toHaveBeenCalledWith(dto);
  });
});
