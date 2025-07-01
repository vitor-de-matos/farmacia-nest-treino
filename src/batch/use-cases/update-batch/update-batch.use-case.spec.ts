import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateBatchUseCase } from './update-batch.use-case';

describe('UpdateBatchUseCase', () => {
  let useCase: UpdateBatchUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      update: jest.fn(),
    };

    useCase = new UpdateBatchUseCase(mockRepo);
  });

  it('deve atualizar o lote se ele existir', async () => {
    const id = 1;
    const dto = { code: 'Atualizado' } as any;
    const loteExistente = { id: 1, code: 'Antigo' };

    mockRepo.findById.mockResolvedValue(loteExistente);
    mockRepo.update.mockResolvedValue({ id, ...dto });

    const result = await useCase.update(id, dto);

    expect(result).toEqual({ id, ...dto });
    expect(mockRepo.findById).toHaveBeenCalledWith(id);
    expect(mockRepo.update).toHaveBeenCalledWith(id, dto);
  });

  it('deve lançar NotFoundException se o lote não existir', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.update(123, {} as any)).rejects.toThrow(
      NotFoundException,
    );
    expect(mockRepo.update).not.toHaveBeenCalled();
  });

  it('deve lançar InternalServerErrorException se o update falhar', async () => {
    mockRepo.findById.mockResolvedValue({ id: 1 });
    mockRepo.update.mockResolvedValue(null);

    await expect(useCase.update(1, {} as any)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
