import { CreateItemSaleController } from './create-item-sale.controller';
import { CreateItemSaleDTO } from 'src/itemSale/models/dtos/create-item-sale.dto';
import {
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

describe('CreateItemSaleController', () => {
  let controller: CreateItemSaleController;
  let mockUseCase: any;

  const dto: CreateItemSaleDTO = {
    saleId: 10,
    quantity: 2,
    unitPrice: 50,
    subtotal: 100,
    productId: 5,
    batchId: 7,
  };

  beforeEach(() => {
    mockUseCase = {
      create: jest.fn(),
    };

    controller = new CreateItemSaleController(mockUseCase);
  });

  it('deve criar um item de venda e retornar o ID', async () => {
    const expectedId = 101;
    mockUseCase.create.mockResolvedValue(expectedId);

    const result = await controller.create(dto);

    expect(result).toBe(expectedId);
    expect(mockUseCase.create).toHaveBeenCalledWith(dto);
  });

  it('deve lançar BadRequestException se o estoque for insuficiente', async () => {
    mockUseCase.create.mockRejectedValue(new BadRequestException());

    await expect(controller.create(dto)).rejects.toThrow(BadRequestException);
    expect(mockUseCase.create).toHaveBeenCalledWith(dto);
  });

  it('deve lançar NotFoundException se o produto ou lote não existirem', async () => {
    mockUseCase.create.mockRejectedValue(new NotFoundException());

    await expect(controller.create(dto)).rejects.toThrow(NotFoundException);
    expect(mockUseCase.create).toHaveBeenCalledWith(dto);
  });

  it('deve lançar InternalServerErrorException em erro inesperado', async () => {
    mockUseCase.create.mockRejectedValue(new InternalServerErrorException());

    await expect(controller.create(dto)).rejects.toThrow(
      InternalServerErrorException,
    );
    expect(mockUseCase.create).toHaveBeenCalledWith(dto);
  });
});
