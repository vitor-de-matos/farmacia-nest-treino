import { UpdatePersonDTO } from 'src/person/models/dtos/update-person.dto';
import { UpdatePersonController } from './update-person.controller';
import { UpdatePersonUseCase } from './update-person.use-case';
import { Pessoa } from 'src/person/models/entity/person.entity';
import {
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

describe('UpdatePersonController', () => {
  let controller: UpdatePersonController;
  let useCase: UpdatePersonUseCase;

  beforeEach(() => {
    useCase = {
      update: jest.fn(),
    } as unknown as UpdatePersonUseCase;

    controller = new UpdatePersonController(useCase);
  });

  it('deve atualizar e retornar a pessoa atualizada', async () => {
    const dto: UpdatePersonDTO = { name: 'Atualizado' } as UpdatePersonDTO;
    const updated: Pessoa = { id: 1, name: 'Atualizado' } as Pessoa;

    (useCase.update as jest.Mock).mockResolvedValue(updated);

    const result = await controller.update(1, dto);

    expect(result).toEqual(updated);
    expect(useCase.update).toHaveBeenCalledWith(1, dto);
  });

  it('deve lançar NotAcceptableException se o ID não for numérico', async () => {
    const dto: UpdatePersonDTO = { name: 'Invalido' } as UpdatePersonDTO;

    await expect(controller.update('abc' as any, dto)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(useCase.update).not.toHaveBeenCalled();
  });

  it('deve lançar NotFoundException se a pessoa não for encontrada', async () => {
    const dto: UpdatePersonDTO = { name: 'Teste' } as UpdatePersonDTO;

    (useCase.update as jest.Mock).mockRejectedValue(new NotFoundException());

    await expect(controller.update(999, dto)).rejects.toThrow(
      NotFoundException,
    );
    expect(useCase.update).toHaveBeenCalledWith(999, dto);
  });

  it('deve lançar InternalServerErrorException se a atualização falhar', async () => {
    const dto: UpdatePersonDTO = { name: 'Falha' } as UpdatePersonDTO;

    (useCase.update as jest.Mock).mockRejectedValue(
      new InternalServerErrorException(),
    );

    await expect(controller.update(1, dto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
