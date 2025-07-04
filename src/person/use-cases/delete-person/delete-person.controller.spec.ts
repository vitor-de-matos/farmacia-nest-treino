import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { DeletePersonController } from './delete-person.controller';
import { DeletePersonUseCase } from './delete-person.use-case';

describe('DeletePersonController', () => {
  let controller: DeletePersonController;
  let mockUseCase: DeletePersonUseCase;

  beforeEach(() => {
    mockUseCase = {
      delete: jest.fn(),
    } as unknown as DeletePersonUseCase;

    controller = new DeletePersonController(mockUseCase);
  });

  it('deve deletar uma pessoa e retornar mensagem de sucesso', async () => {
    (mockUseCase.delete as jest.Mock).mockResolvedValue(undefined);

    const result = await controller.delete(1);

    expect(result).toBe('Pessoa removida com sucesso');
    expect(mockUseCase.delete).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotAcceptableException se o id não for um número', async () => {
    await expect(controller.delete('abc' as any)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.delete).not.toHaveBeenCalled();
  });

  it('deve lançar NotFoundException se a pessoa não existir', async () => {
    (mockUseCase.delete as jest.Mock).mockRejectedValue(
      new NotFoundException(),
    );

    await expect(controller.delete(999)).rejects.toThrow(NotFoundException);
    expect(mockUseCase.delete).toHaveBeenCalledWith(999);
  });
});
