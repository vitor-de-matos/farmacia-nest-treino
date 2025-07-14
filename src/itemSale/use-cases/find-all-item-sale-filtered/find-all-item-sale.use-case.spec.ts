import { FindAllItemSaleUseCase } from './find-all-item-sale.use-case';
import { FindItemSaleDTO } from 'src/itemSale/models/dtos/find-item-sale.dto';
import { ItemVenda } from 'src/itemSale/models/entity/item-sale.entity';

describe('FindAllItemSaleUseCase', () => {
  let useCase: FindAllItemSaleUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      find: jest.fn(),
    };

    useCase = new FindAllItemSaleUseCase(mockRepo);
  });

  it('deve retornar os itens de venda filtrados com paginação', async () => {
    const dto: FindItemSaleDTO = {
      page: 1,
      quantity: 10,
    };

    const mockResponse = {
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

    mockRepo.find.mockResolvedValue(mockResponse);

    const result = await useCase.find(dto);

    expect(result).toEqual(mockResponse);
    expect(mockRepo.find).toHaveBeenCalledWith(dto);
  });
});
