import { FindPaymentUseCase } from './find-payment.use-case';
import { NotFoundException } from '@nestjs/common';
import { IPaymentRepo } from 'src/payment/models/interface/payment-repo.interface';
import { Pagamento } from 'src/payment/models/entity/payment.entity';

describe('FindPaymentUseCase', () => {
  let useCase: FindPaymentUseCase;
  let mockRepo: jest.Mocked<IPaymentRepo>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
    } as unknown as jest.Mocked<IPaymentRepo>;

    useCase = new FindPaymentUseCase(mockRepo);
  });

  it('deve retornar um pagamento existente', async () => {
    const pagamentoMock: Pagamento = { id: 1, value: 150 } as Pagamento;

    mockRepo.findById.mockResolvedValue(pagamentoMock);

    const result = await useCase.find(1);

    expect(result).toEqual(pagamentoMock);
    expect(mockRepo.findById).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotFoundException se o pagamento não existir', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.find(999)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(999);
  });
});
