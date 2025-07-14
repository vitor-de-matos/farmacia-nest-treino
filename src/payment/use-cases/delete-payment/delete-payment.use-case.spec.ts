import { DeletePaymentUseCase } from './delete-payment.use-case';
import { NotFoundException } from '@nestjs/common';
import { IPaymentRepo } from 'src/payment/models/interface/payment-repo.interface';
import {
  StatusPagamento,
  FormaPagamento,
} from 'src/payment/models/entity/payment.entity';

describe('DeletePaymentUseCase', () => {
  let deletePaymentUseCase: DeletePaymentUseCase;
  let mockPaymentRepo: jest.Mocked<IPaymentRepo>;

  beforeEach(() => {
    mockPaymentRepo = {
      findById: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<IPaymentRepo>;

    deletePaymentUseCase = new DeletePaymentUseCase(mockPaymentRepo);
  });

  it('deve deletar um pagamento existente', async () => {
    const mockPayment = {
      id: 1,
      amount: 100,
      paymentMethod: FormaPagamento.PIX,
      value: 100,
      status: StatusPagamento.PAGO,
      createdAt: null,
      updatedAt: null,
      sale: null,
    };

    mockPaymentRepo.findById.mockResolvedValue(mockPayment);
    mockPaymentRepo.delete.mockResolvedValue(undefined);

    await expect(deletePaymentUseCase.delete(1)).resolves.toBeUndefined();
    expect(mockPaymentRepo.findById).toHaveBeenCalledWith(1);
    expect(mockPaymentRepo.delete).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotFoundException se o pagamento não existir', async () => {
    mockPaymentRepo.findById.mockResolvedValue(null);

    await expect(deletePaymentUseCase.delete(999)).rejects.toThrow(
      NotFoundException,
    );
    expect(mockPaymentRepo.findById).toHaveBeenCalledWith(999);
    expect(mockPaymentRepo.delete).not.toHaveBeenCalled();
  });
});
