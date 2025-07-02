import { UpdateItemSaleDTO } from 'src/itemSale/models/dtos/update-item-sale.dto';
import { UpdateItemSaleUseCase } from './update-item-sale.use-case';
import { ItemVenda } from 'src/itemSale/models/entity/item-sale.entity';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('UpdateItemSaleUseCase', () => {
  let useCase: UpdateItemSaleUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      update: jest.fn(),
    };

    useCase = new UpdateItemSaleUseCase(mockRepo);
  });

  const itemSaleId = 1;
  const updateDTO: UpdateItemSaleDTO = {
    quantity: 3,
    unitPrice: 30,
    subtotal: 90,
  };

  it('deve atualizar o item de venda se ele existir', async () => {
    const updatedItem = { id: itemSaleId, ...updateDTO } as ItemVenda;

    mockRepo.findById.mockResolvedValue({ id: itemSaleId });
    mockRepo.update.mockResolvedValue(updatedItem);

    const result = await useCase.update(itemSaleId, updateDTO);

    expect(result).toEqual(updatedItem);
    expect(mockRepo.findById).toHaveBeenCalledWith(itemSaleId);
    expect(mockRepo.update).toHaveBeenCalledWith(itemSaleId, updateDTO);
  });

  it('deve lançar NotFoundException se o item não existir', async () => {
    mockRepo.findById.mockResolvedValue(undefined);

    await expect(useCase.update(itemSaleId, updateDTO)).rejects.toThrow(
      NotFoundException,
    );
    expect(mockRepo.findById).toHaveBeenCalledWith(itemSaleId);
    expect(mockRepo.update).not.toHaveBeenCalled();
  });

  it('deve lançar InternalServerErrorException se o update falhar', async () => {
    mockRepo.findById.mockResolvedValue({ id: itemSaleId });
    mockRepo.update.mockResolvedValue(undefined);

    await expect(useCase.update(itemSaleId, updateDTO)).rejects.toThrow(
      InternalServerErrorException,
    );
    expect(mockRepo.findById).toHaveBeenCalledWith(itemSaleId);
    expect(mockRepo.update).toHaveBeenCalledWith(itemSaleId, updateDTO);
  });
});
