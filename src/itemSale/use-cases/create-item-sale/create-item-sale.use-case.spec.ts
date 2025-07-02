import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemSaleUseCase } from './create-item-sale.use-case';

describe('CreateItemSaleUseCase', () => {
  let useCase: CreateItemSaleUseCase;
  let mockItemSaleRepo: any;
  let mockProductRepo: any;
  let mockStockRepo: any;

  beforeEach(() => {
    mockItemSaleRepo = {
      create: jest.fn(),
    };

    mockProductRepo = {
      findById: jest.fn(),
    };

    mockStockRepo = {
      find: jest.fn(),
      update: jest.fn(),
    };

    useCase = new CreateItemSaleUseCase(
      mockItemSaleRepo,
      mockProductRepo,
      mockStockRepo,
    );
  });
  const dto = {
    itemId: 10,
    saleId: 20,
    quantity: 3,
    price: 100,
    unitPrice: 33.33,
    subtotal: 100,
    productId: 1,
    batchId: 2,
  };

  it('deve criar um novo item de venda com sucesso', async () => {
    mockProductRepo.findById.mockResolvedValue({
      data: [{ id: dto.productId }],
    });
    mockStockRepo.find.mockResolvedValue({ data: [{ id: 1, quantity: 10 }] });
    mockStockRepo.update.mockResolvedValue({});
    mockItemSaleRepo.create.mockResolvedValue(1);

    const result = await useCase.create(dto);

    expect(result).toBe(1);
    expect(mockProductRepo.findById).toHaveBeenCalledWith(dto.productId);
    expect(mockStockRepo.find).toHaveBeenCalledWith({ batchId: dto.batchId });
    expect(mockStockRepo.update).toHaveBeenCalled();
    expect(mockItemSaleRepo.create).toHaveBeenCalledWith(dto);
  });

  it('deve lançar BadRequestException se o produto não existir', async () => {
    mockStockRepo.find.mockResolvedValue({ data: [{ quantity: 10 }] });
    mockProductRepo.findById.mockResolvedValue({ data: [] });

    await expect(useCase.create(dto)).rejects.toThrow(BadRequestException);
  });

  it('deve lançar NotFoundException se o estoque não for encontrado', async () => {
    mockProductRepo.findById.mockResolvedValue({
      data: [{ id: dto.productId }],
    });
    mockStockRepo.find.mockResolvedValue({ data: [] });

    await expect(useCase.create(dto)).rejects.toThrow(NotFoundException);
  });

  it('deve lançar BadRequestException se o estoque for insuficiente', async () => {
    mockProductRepo.findById.mockResolvedValue({
      data: [{ id: dto.productId }],
    });
    mockStockRepo.find.mockResolvedValue({ data: [{ quantity: 2 }] });

    await expect(useCase.create(dto)).rejects.toThrow(BadRequestException);
  });

  it('deve lançar InternalServerErrorException se o repositório falhar', async () => {
    mockProductRepo.findById.mockResolvedValue({
      data: [{ id: dto.productId }],
    });
    mockStockRepo.find.mockResolvedValue({ data: [{ quantity: 10 }] });
    mockStockRepo.update.mockResolvedValue({});
    mockItemSaleRepo.create.mockRejectedValue(
      new InternalServerErrorException('Erro interno'),
    );

    await expect(useCase.create(dto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
