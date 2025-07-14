import { DeleteSalesUseCase } from './delete-sales.use-case';
import { NotFoundException } from '@nestjs/common';
import { ISalesRepo } from 'src/sales/models/interface/sales-repo.interface';

describe('DeleteSalesUseCase', () => {
  let useCase: DeleteSalesUseCase;
  let mockRepo: jest.Mocked<ISalesRepo>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<ISalesRepo>;

    useCase = new DeleteSalesUseCase(mockRepo);
  });

  it('deve deletar uma venda existente', async () => {
    const id = 1;
    const mockSale = {
      id,
      cpf: 'Fulano',
      totalValue: 100,
      emissionDate: new Date(),
      itemSale: null,
      payments: null,
      employee: null,
    };

    mockRepo.findById.mockResolvedValue(mockSale);
    mockRepo.delete.mockResolvedValue(undefined);

    await expect(useCase.delete(id)).resolves.toBeUndefined();
    expect(mockRepo.findById).toHaveBeenCalledWith(id);
    expect(mockRepo.delete).toHaveBeenCalledWith(id);
  });

  it('deve lançar NotFoundException se a venda não for encontrada', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.delete(999)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(999);
    expect(mockRepo.delete).not.toHaveBeenCalled();
  });
});
