import { IPaymentRepo } from 'src/payment/models/interface/payment-repo.interface';
import { UpdatePaymentUseCase } from './update-payment.use-case';
import { UpdatePaymentDTO } from 'src/payment/models/dtos/update-paymente.dto';
import {
  FormaPagamento,
  StatusPagamento,
} from 'src/payment/models/entity/payment.entity';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('UpdatePaymentUseCase', () => {
  let useCase: UpdatePaymentUseCase;
  let mockRepo: jest.Mocked<IPaymentRepo>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<IPaymentRepo>;

    useCase = new UpdatePaymentUseCase(mockRepo);
  });

  it('deve atualizar e retornar o pagamento', async () => {
    const paymentId = 1;
    const dto: UpdatePaymentDTO = { valor: 200 } as UpdatePaymentDTO;
    const existingPayment = {
      id: paymentId,
      value: 150,
      paymentMethod: FormaPagamento.PIX,
      status: StatusPagamento.PENDENTE,
      createdAt: null,
      updatedAt: null,
      sale: null,
    };
    const updatedPayment = {
      id: paymentId,
      value: 200,
      paymentMethod: FormaPagamento.PIX,
      status: StatusPagamento.PAGO,
      createdAt: null,
      updatedAt: new Date(),
      sale: null,
    };

    mockRepo.findById.mockResolvedValue(existingPayment);
    mockRepo.update.mockResolvedValue(updatedPayment);

    const result = await useCase.update(paymentId, dto);

    expect(result).toEqual(updatedPayment);
    expect(mockRepo.findById).toHaveBeenCalledWith(paymentId);
    expect(mockRepo.update).toHaveBeenCalledWith(paymentId, dto);
  });

  it('deve lançar NotFoundException se o pagamento não existir', async () => {
    mockRepo.findById.mockResolvedValue(null);
    const dto: UpdatePaymentDTO = { valor: 200 } as UpdatePaymentDTO;

    await expect(useCase.update(999, dto)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(999);
    expect(mockRepo.update).not.toHaveBeenCalled();
  });

  it('deve lançar InternalServerErrorException se a atualização falhar', async () => {
    const paymentId = 1;
    const dto: UpdatePaymentDTO = { valor: 250 } as UpdatePaymentDTO;
    const existingPayment = {
      id: paymentId,
      value: 150,
      paymentMethod: FormaPagamento.PIX,
      status: StatusPagamento.PENDENTE,
      createdAt: null,
      updatedAt: null,
      sale: null,
    };

    mockRepo.findById.mockResolvedValue(existingPayment);
    mockRepo.update.mockResolvedValue(null);

    await expect(useCase.update(paymentId, dto)).rejects.toThrow(
      InternalServerErrorException,
    );
    expect(mockRepo.findById).toHaveBeenCalledWith(paymentId);
    expect(mockRepo.update).toHaveBeenCalledWith(paymentId, dto);
  });
});
