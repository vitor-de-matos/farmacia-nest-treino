import { DeleteItemSaleController } from './delete-item-sale.controller';
import {
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

describe('DeleteItemSaleController', () => {
  let controller: DeleteItemSaleController;
  let mockUseCase: any;

  beforeEach(() => {
    mockUseCase = {
      delete: jest.fn(),
    };

    controller = new DeleteItemSaleController(mockUseCase);
  });

  it('deve excluir um item de venda com sucesso', async () => {
    const id = 10;
    mockUseCase.delete.mockResolvedValue(undefined);

    const result = await controller.delete(id);

    expect(mockUseCase.delete).toHaveBeenCalledWith(id);
    expect(result).toBe('Item de venda removido com sucesso');
  });

  it('deve lançar NotAcceptableException se o id não for número', async () => {
    await expect(controller.delete(NaN)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.delete).not.toHaveBeenCalled();
  });

  it('deve lançar NotFoundException se o item não for encontrado', async () => {
    const id = 999;
    mockUseCase.delete.mockRejectedValue(new NotFoundException());

    await expect(controller.delete(id)).rejects.toThrow(NotFoundException);
    expect(mockUseCase.delete).toHaveBeenCalledWith(id);
  });

  it('deve lançar InternalServerErrorException para erros inesperados', async () => {
    const id = 1;
    mockUseCase.delete.mockRejectedValue(new InternalServerErrorException());

    await expect(controller.delete(id)).rejects.toThrow(
      InternalServerErrorException,
    );
    expect(mockUseCase.delete).toHaveBeenCalledWith(id);
  });
});
