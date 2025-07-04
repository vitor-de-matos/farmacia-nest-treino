import { ISalesRepo } from 'src/sales/models/interface/sales-repo.interface';
import { UpdateSalesUseCase } from './update-sales.use-case';
import { UpdateSalesDTO } from 'src/sales/models/dtos/update-sales.dto';
import { Venda } from 'src/sales/models/entity/sales.entity';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('UpdateSalesUseCase', () => {
  let useCase: UpdateSalesUseCase;
  let mockRepo: jest.Mocked<ISalesRepo>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<ISalesRepo>;

    useCase = new UpdateSalesUseCase(mockRepo);
  });

  it('deve atualizar e retornar a venda', async () => {
    const id = 1;
    const dto: UpdateSalesDTO = { cpf: '12345678900' } as UpdateSalesDTO;
    const existing = {
      id,
      cpf: '00987654321',
      totalValue: 100,
      emissionDate: null,
      itemSale: null,
      payments: null,
      employee: null,
    };
    const updated = { id, cpf: '12345678900' } as Venda;

    mockRepo.findById.mockResolvedValue(existing);
    mockRepo.update.mockResolvedValue(updated);

    const result = await useCase.update(id, dto);

    expect(result).toEqual(updated);
    expect(mockRepo.findById).toHaveBeenCalledWith(id);
    expect(mockRepo.update).toHaveBeenCalledWith(id, dto);
  });

  it('deve lançar NotFoundException se a venda não existir', async () => {
    mockRepo.findById.mockResolvedValue(null);
    const dto: UpdateSalesDTO = { cpf: '123' } as UpdateSalesDTO;

    await expect(useCase.update(999, dto)).rejects.toThrow(NotFoundException);
    expect(mockRepo.update).not.toHaveBeenCalled();
  });

  it('deve lançar InternalServerErrorException se a atualização falhar', async () => {
    const id = 1;
    const dto: UpdateSalesDTO = { cpf: 'novo' } as UpdateSalesDTO;
    const existing = {
      id,
      cpf: '00987654321',
      totalValue: 100,
      emissionDate: null,
      itemSale: null,
      payments: null,
      employee: null,
    };

    mockRepo.findById.mockResolvedValue(existing);
    mockRepo.update.mockResolvedValue(null);

    await expect(useCase.update(id, dto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
