import { CreatePaymentController } from './create-payment.controller';
import { CreatePaymentUseCase } from './create-payment.use-case';
import { BadRequestException } from '@nestjs/common';
import { CreatePaymentDTO } from 'src/payment/models/dtos/create-payment.dto';
import {
  StatusPagamento,
  FormaPagamento,
} from 'src/payment/models/entity/payment.entity';

describe('CreatePaymentController', () => {
  let controller: CreatePaymentController;
  let useCase: jest.Mocked<CreatePaymentUseCase>;

  const mockDto: CreatePaymentDTO = {
    value: 100,
    paymentMethod: FormaPagamento.PIX,
    saleId: 1,
    status: StatusPagamento.PAGO,
  };

  beforeEach(() => {
    useCase = {
      create: jest.fn(),
    } as any;

    controller = new CreatePaymentController(useCase);
  });

  it('deve retornar o ID do pagamento criado com sucesso', async () => {
    useCase.create.mockResolvedValue(123);

    const result = await controller.create(mockDto);

    expect(result).toBe(123);
    expect(useCase.create).toHaveBeenCalledWith(mockDto);
  });

  it('deve lançar exceção se o use case lançar', async () => {
    useCase.create.mockRejectedValue(new BadRequestException('Erro'));

    await expect(controller.create(mockDto)).rejects.toThrow(
      BadRequestException,
    );
  });
});
