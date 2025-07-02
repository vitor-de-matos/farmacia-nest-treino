import { NotFoundException } from '@nestjs/common';
import { DeleteItemSaleUseCase } from './delete-item-sale.use-case';

describe('DeleteItemSaleUseCase', () => {
  let useCase: DeleteItemSaleUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new DeleteItemSaleUseCase(mockRepo);
  });

  it('deve deletar o item de venda se existir', async () => {
    const id = 123;
    mockRepo.findById.mockResolvedValue({ id });
    mockRepo.delete.mockResolvedValue(undefined);

    await useCase.delete(id);

    expect(mockRepo.findById).toHaveBeenCalledWith(id);
    expect(mockRepo.delete).toHaveBeenCalledWith(id);
  });

  it('deve lançar NotFoundException se o item não existir', async () => {
    const id = 999;
    mockRepo.findById.mockResolvedValue(undefined);

    await expect(useCase.delete(id)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(id);
    expect(mockRepo.delete).not.toHaveBeenCalled();
  });
});
