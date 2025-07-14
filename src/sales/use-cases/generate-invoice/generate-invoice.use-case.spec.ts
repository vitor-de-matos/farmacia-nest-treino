import { GenerateInvoiceUseCase } from './generate-invoice.use-case';
import { NotFoundException } from '@nestjs/common';
import { ISalesRepo } from 'src/sales/models/interface/sales-repo.interface';
import { Venda } from 'src/sales/models/entity/sales.entity';

describe('GenerateInvoiceUseCase', () => {
  let useCase: GenerateInvoiceUseCase;
  let mockRepo: jest.Mocked<ISalesRepo>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
    } as unknown as jest.Mocked<ISalesRepo>;

    useCase = new GenerateInvoiceUseCase(mockRepo);
  });

  it('deve retornar a venda se encontrada', async () => {
    const venda: Venda = {
      id: 1,
      cpf: '12345678900',
      totalValue: 100,
      emissionDate: new Date(),
      itemSale: [],
      payments: undefined,
      employee: null,
    };

    mockRepo.findById.mockResolvedValue(venda);

    const result = await useCase.find(1);

    expect(result).toEqual(venda);
    expect(mockRepo.findById).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotFoundException se a venda não for encontrada', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.find(999)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(999);
  });
});
