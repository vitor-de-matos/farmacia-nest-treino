import { NotAcceptableException } from '@nestjs/common';
import { DeleteProdutoController } from './delete-product.controller';
import { DeleteProdutoUseCase } from './delete-product.use-case';

describe('DeleteProdutoController', () => {
  let controller: DeleteProdutoController;
  let useCase: DeleteProdutoUseCase;

  beforeEach(() => {
    useCase = {
      delete: jest.fn(),
    } as unknown as DeleteProdutoUseCase;

    controller = new DeleteProdutoController(useCase);
  });

  it('deve deletar produto com sucesso e retornar mensagem', async () => {
    (useCase.delete as jest.Mock).mockResolvedValue(undefined);

    const result = await controller.delete(1);

    expect(useCase.delete).toHaveBeenCalledWith(1);
    expect(result).toBe('Produto deletado com sucesso');
  });

  it('deve lançar NotAcceptableException se id for inválido', async () => {
    await expect(controller.delete(NaN)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(useCase.delete).not.toHaveBeenCalled();
  });
});
