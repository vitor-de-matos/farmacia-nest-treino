import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { FindPersonController } from './find-person.controller';
import { FindPersonUseCase } from './find-person.use-case';
import { Pessoa } from 'src/person/models/entity/person.entity';

describe('FindPersonController', () => {
  let controller: FindPersonController;
  let useCase: FindPersonUseCase;

  beforeEach(() => {
    useCase = {
      find: jest.fn(),
    } as unknown as FindPersonUseCase;

    controller = new FindPersonController(useCase);
  });

  it('deve retornar uma pessoa existente', async () => {
    const mockPerson: Pessoa = { id: 1, name: 'João' } as Pessoa;
    (useCase.find as jest.Mock).mockResolvedValue(mockPerson);

    const result = await controller.find(1);

    expect(result).toEqual(mockPerson);
    expect(useCase.find).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotAcceptableException se o ID não for numérico', async () => {
    await expect(controller.find('abc' as any)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(useCase.find).not.toHaveBeenCalled();
  });

  it('deve lançar NotFoundException se a pessoa não for encontrada', async () => {
    (useCase.find as jest.Mock).mockRejectedValue(new NotFoundException());

    await expect(controller.find(999)).rejects.toThrow(NotFoundException);
    expect(useCase.find).toHaveBeenCalledWith(999);
  });
});
