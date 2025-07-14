import { FindAllItemSaleController } from './find-all-item-sale.controller';
import { FindItemSaleDTO } from 'src/itemSale/models/dtos/find-item-sale.dto';
import { ItemVenda } from 'src/itemSale/models/entity/item-sale.entity';

describe('FindAllItemSaleController', () => {
  let controller: FindAllItemSaleController;
  let mockUseCase: any;

  beforeEach(() => {
    mockUseCase = {
      find: jest.fn(),
    };

    controller = new FindAllItemSaleController(mockUseCase);
  });

  it('deve retornar itens de venda filtrados com paginação', async () => {
    const dto: FindItemSaleDTO = {
      page: 1,
      quantity: 5,
    };

    const expectedResponse = {
      data: [
        {
          id: 1,
          saleId: 10,
          quantity: 10,
          subtotal: 10,
          unitPrice: 1,
          sale: null,
          batch: null,
          product: null,
        } as ItemVenda,
      ],
      currentPage: 1,
      totalPages: 1,
      totalItems: 1,
    };

    mockUseCase.find.mockResolvedValue(expectedResponse);

    const result = await controller.find(dto);

    expect(result).toEqual(expectedResponse);
    expect(mockUseCase.find).toHaveBeenCalledWith(dto);
  });

  it('deve lançar erro se o use case falhar', async () => {
    const dto: FindItemSaleDTO = {
      page: 1,
      quantity: 5,
    };

    mockUseCase.find.mockRejectedValue(new Error('Erro interno'));

    await expect(controller.find(dto)).rejects.toThrow('Erro interno');
  });
});
