import { NotAcceptableException } from '@nestjs/common';
import { DeleteMidiaController } from './delete-media.controller';
import { DeleteMidiaUseCase } from './delete-media.use-case';

describe('DeleteMidiaController', () => {
  let controller: DeleteMidiaController;
  let mockUseCase: jest.Mocked<DeleteMidiaUseCase>;

  beforeEach(() => {
    mockUseCase = {
      delete: jest.fn(),
    } as any;

    controller = new DeleteMidiaController(mockUseCase);
  });

  it('deve deletar mídia com sucesso e retornar mensagem', async () => {
    mockUseCase.delete.mockResolvedValue(undefined);

    const result = await controller.delete(1);

    expect(mockUseCase.delete).toHaveBeenCalledWith(1);
    expect(result).toBe('Midia removida com sucesso');
  });

  it('deve lançar NotAcceptableException se id não for número', async () => {
    await expect(controller.delete(NaN)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.delete).not.toHaveBeenCalled();
  });
});
