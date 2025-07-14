import { CreatePaymentUseCase } from './create-payment.use-case';
import { BadRequestException } from '@nestjs/common';
import { CreatePaymentDTO } from 'src/payment/models/dtos/create-payment.dto';
import { IPaymentRepo } from 'src/payment/models/interface/payment-repo.interface';
import {
  StatusPagamento,
  FormaPagamento,
} from 'src/payment/models/entity/payment.entity';

describe('CreatePaymentUseCase', () => {
  let useCase: CreatePaymentUseCase;
  let paymentRepo: jest.Mocked<IPaymentRepo>;

  const mockDto: CreatePaymentDTO = {
    value: 100,
    paymentMethod: FormaPagamento.PIX,
    saleId: 1,
    status: StatusPagamento.PAGO,
  };

  beforeEach(() => {
    paymentRepo = {
      create: jest.fn(),
    } as any;

    useCase = new CreatePaymentUseCase(paymentRepo);
  });

  it('deve retornar o ID do pagamento criado com sucesso', async () => {
    paymentRepo.create.mockResolvedValue(42);

    const result = await useCase.create(mockDto);

    expect(result).toBe(42);
    expect(paymentRepo.create).toHaveBeenCalledWith(mockDto);
  });

  it('deve lançar BadRequestException se o retorno for NaN', async () => {
    paymentRepo.create.mockResolvedValue(NaN);

    await expect(useCase.create(mockDto)).rejects.toThrow(BadRequestException);
  });
});
