import { ItemVenda } from 'src/itemSale/models/entity/item-sale.entity';
import { FindItemSaleController } from './find-item-sale.controller';
import {
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

describe('FindItemSaleController', () => {
  let controller: FindItemSaleController;
  let mockUseCase: any;

  beforeEach(() => {
    mockUseCase = {
      find: jest.fn(),
    };

    controller = new FindItemSaleController(mockUseCase);
  });

  it('deve retornar um item de venda válido', async () => {
    const id = 1;
    const expectedItem = {
      id: 1,
      saleId: 10,
      quantity: 10,
      subtotal: 10,
      unitPrice: 1,
      sale: null,
      batch: null,
      product: null,
    } as ItemVenda;

    mockUseCase.find.mockResolvedValue(expectedItem);

    const result = await controller.find(id);

    expect(result).toEqual(expectedItem);
    expect(mockUseCase.find).toHaveBeenCalledWith(id);
  });

  it('deve lançar NotAcceptableException se id não for número', async () => {
    await expect(controller.find(NaN)).rejects.toThrow(NotAcceptableException);
    expect(mockUseCase.find).not.toHaveBeenCalled();
  });

  it('deve lançar NotFoundException se o item não for encontrado', async () => {
    const id = 999;
    mockUseCase.find.mockRejectedValue(new NotFoundException());

    await expect(controller.find(id)).rejects.toThrow(NotFoundException);
    expect(mockUseCase.find).toHaveBeenCalledWith(id);
  });

  it('deve lançar InternalServerErrorException em erro inesperado', async () => {
    const id = 5;
    mockUseCase.find.mockRejectedValue(new InternalServerErrorException());

    await expect(controller.find(id)).rejects.toThrow(
      InternalServerErrorException,
    );
    expect(mockUseCase.find).toHaveBeenCalledWith(id);
  });
});
