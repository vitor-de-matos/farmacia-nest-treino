import { UpdateItemSaleController } from './update-item-sale.controller';
import { UpdateItemSaleDTO } from 'src/itemSale/models/dtos/update-item-sale.dto';
import { ItemVenda } from 'src/itemSale/models/entity/item-sale.entity';
import {
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

describe('UpdateItemSaleController', () => {
  let controller: UpdateItemSaleController;
  let mockUseCase: any;

  beforeEach(() => {
    mockUseCase = {
      update: jest.fn(),
    };

    controller = new UpdateItemSaleController(mockUseCase);
  });

  const itemSaleId = 1;
  const dto: UpdateItemSaleDTO = {
    quantity: 3,
    unitPrice: 30,
    subtotal: 90,
  };

  it('deve atualizar o item de venda com sucesso', async () => {
    const expected = { id: itemSaleId, ...dto } as ItemVenda;
    mockUseCase.update.mockResolvedValue(expected);

    const result = await controller.update(itemSaleId, dto);

    expect(result).toEqual(expected);
    expect(mockUseCase.update).toHaveBeenCalledWith(itemSaleId, dto);
  });

  it('deve lançar NotAcceptableException se o id não for numérico', async () => {
    await expect(controller.update(NaN, dto)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.update).not.toHaveBeenCalled();
  });

  it('deve lançar NotFoundException se o use case lançar', async () => {
    mockUseCase.update.mockRejectedValue(new NotFoundException());

    await expect(controller.update(itemSaleId, dto)).rejects.toThrow(
      NotFoundException,
    );
    expect(mockUseCase.update).toHaveBeenCalledWith(itemSaleId, dto);
  });

  it('deve lançar InternalServerErrorException se o use case lançar', async () => {
    mockUseCase.update.mockRejectedValue(new InternalServerErrorException());

    await expect(controller.update(itemSaleId, dto)).rejects.toThrow(
      InternalServerErrorException,
    );
    expect(mockUseCase.update).toHaveBeenCalledWith(itemSaleId, dto);
  });
});
