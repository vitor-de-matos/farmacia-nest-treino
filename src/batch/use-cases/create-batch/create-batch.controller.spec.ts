import { CreateBatchDTO } from 'src/batch/models/dtos/create-lote.dto';
import { CreateBatchController } from './create-batch.controller';
import { CreateBatchUseCase } from './create-batch.use-case';
import { BadRequestException } from '@nestjs/common';

describe('CreateBatchController', () => {
  let controller: CreateBatchController;
  let mockUseCase: CreateBatchUseCase;

  beforeEach(() => {
    mockUseCase = {
      create: jest.fn(),
    } as any;

    controller = new CreateBatchController(mockUseCase);
  });

  it('deve retornar o ID do lote criado', async () => {
    const dto: CreateBatchDTO = { name: 'Lote Teste' } as any;
    (mockUseCase.create as jest.Mock).mockResolvedValue(101);

    const result = await controller.create(dto);

    expect(result).toBe(101);
    expect(mockUseCase.create).toHaveBeenCalledWith(dto);
  });

  it('deve lançar exceção se o use-case falhar', async () => {
    const dto: CreateBatchDTO = { name: 'Lote com erro' } as any;
    (mockUseCase.create as jest.Mock).mockRejectedValue(
      new BadRequestException('Erro simulado'),
    );

    await expect(controller.create(dto)).rejects.toThrow(BadRequestException);
  });
});
