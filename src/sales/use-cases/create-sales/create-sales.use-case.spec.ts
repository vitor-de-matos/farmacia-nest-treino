import { ISalesRepo } from 'src/sales/models/interface/sales-repo.interface';
import { CreateSalesUseCase } from './create-sales.use-case';
import { CreateSalesDTO } from 'src/sales/models/dtos/create-sales.dto';
import { BadRequestException } from '@nestjs/common';

describe('CreateSalesUseCase', () => {
  let useCase: CreateSalesUseCase;
  let mockRepo: jest.Mocked<ISalesRepo>;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
    } as unknown as jest.Mocked<ISalesRepo>;

    useCase = new CreateSalesUseCase(mockRepo);
  });

  it('deve criar uma venda e retornar o ID', async () => {
    const dto: CreateSalesDTO = {
      cliente: 'Fulano',
      totalValue: 100,
      emissionDate: new Date(),
      customerId: 1,
      employeeId: 1,
    } as CreateSalesDTO;
    mockRepo.create.mockResolvedValue(123);

    const result = await useCase.create(dto);

    expect(result).toBe(123);
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
  });

  it('deve lançar BadRequestException se retorno for inválido (NaN)', async () => {
    const dto: CreateSalesDTO = {
      cpf: '11111111111',
      totalValue: 100,
      emissionDate: new Date(),
      customerId: 1,
      employeeId: 1,
    } as CreateSalesDTO;
    mockRepo.create.mockResolvedValue(NaN);

    await expect(useCase.create(dto)).rejects.toThrow(BadRequestException);
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
  });
});
