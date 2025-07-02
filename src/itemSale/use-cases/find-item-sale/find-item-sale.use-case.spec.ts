import { ItemVenda } from 'src/itemSale/models/entity/item-sale.entity';
import { FindItemSaleUseCase } from './find-item-sale.use-case';
import { NotFoundException } from '@nestjs/common';

describe('FindItemSaleUseCase', () => {
  let useCase: FindItemSaleUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
    };

    useCase = new FindItemSaleUseCase(mockRepo);
  });

  it('deve retornar o item de venda se existir', async () => {
    const id = 10;
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

    mockRepo.findById.mockResolvedValue(expectedItem);

    const result = await useCase.find(id);

    expect(result).toEqual(expectedItem);
    expect(mockRepo.findById).toHaveBeenCalledWith(id);
  });

  it('deve lançar NotFoundException se o item não for encontrado', async () => {
    const id = 999;
    mockRepo.findById.mockResolvedValue(undefined);

    await expect(useCase.find(id)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(id);
  });
});
