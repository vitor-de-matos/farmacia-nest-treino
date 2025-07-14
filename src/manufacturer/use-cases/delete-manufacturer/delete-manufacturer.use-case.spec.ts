import { DeleteManufacturerUseCase } from './delete-manufacturer.use-case';
import { NotFoundException } from '@nestjs/common';

describe('DeleteManufacturerUseCase', () => {
  let useCase: DeleteManufacturerUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new DeleteManufacturerUseCase(mockRepo);
  });

  it('deve deletar o fabricante se ele existir', async () => {
    const id = 1;
    mockRepo.findById.mockResolvedValue({ id });
    mockRepo.delete.mockResolvedValue(undefined);

    await useCase.delete(id);

    expect(mockRepo.findById).toHaveBeenCalledWith(id);
    expect(mockRepo.delete).toHaveBeenCalledWith(id);
  });

  it('deve lançar NotFoundException se o fabricante não existir', async () => {
    const id = 999;
    mockRepo.findById.mockResolvedValue(undefined);

    await expect(useCase.delete(id)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(id);
    expect(mockRepo.delete).not.toHaveBeenCalled();
  });
});
