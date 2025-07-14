import { NotFoundException } from '@nestjs/common';
import { FindSalesUseCase } from '../find-sales/find-sales.use-case';
import { ISalesRepo } from 'src/sales/models/interface/sales-repo.interface';

describe('FindSalesUseCase', () => {
  let useCase: FindSalesUseCase;
  let mockRepo: jest.Mocked<ISalesRepo>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
    } as unknown as jest.Mocked<ISalesRepo>;

    useCase = new FindSalesUseCase(mockRepo);
  });

  it('deve retornar uma venda encontrada e formatada', async () => {
    const mockSale = {
      id: 1,
      cpf: '12345678900',
      totalValue: 100.5,
      emissionDate: new Date(),
      payments: null,
      employee: null,
      itemSale: [
        {
          id: 10,
          quantity: 2,
          unitPrice: 25.25,
          subtotal: 50.5,
          sale: null,
          product: null,
          batch: null,
        },
      ],
    };

    mockRepo.findById.mockResolvedValue(mockSale);

    const result = await useCase.find(1);

    expect(result).toEqual({
      id: 1,
      cpf: '12345678900',
      totalValue: 100.5,
      emissionDate: mockSale.emissionDate,
      itemSale: [
        {
          id: 10,
          quantity: 2,
          unitPrice: 25.25,
          subtotal: 50.5,
          sale: undefined,
          product: undefined,
          batch: undefined,
        },
      ],
      payments: undefined,
    });

    expect(mockRepo.findById).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotFoundException se a venda não for encontrada', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.find(999)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(999);
  });
});
