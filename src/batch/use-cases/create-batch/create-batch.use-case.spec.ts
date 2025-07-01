import { CreateBatchUseCase } from './create-batch.use-case';
import { BadRequestException } from '@nestjs/common';

describe('CreateBatchUseCase', () => {
  let useCase: CreateBatchUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
    };

    useCase = new CreateBatchUseCase(mockRepo);
  });

  it('deve retornar o ID do lote criado', async () => {
    mockRepo.create.mockResolvedValue(123);

    const result = await useCase.create({ name: 'Lote 1' } as any);

    expect(result).toBe(123);
    expect(mockRepo.create).toHaveBeenCalledWith({ name: 'Lote 1' });
  });

  it('deve lançar BadRequestException se o retorno for NaN', async () => {
    mockRepo.create.mockResolvedValue(NaN);

    await expect(useCase.create({ name: 'Lote 2' } as any)).rejects.toThrow(
      BadRequestException,
    );
  });
});
