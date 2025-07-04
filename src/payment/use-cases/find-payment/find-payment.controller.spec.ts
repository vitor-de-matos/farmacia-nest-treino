import { Pagamento } from 'src/payment/models/entity/payment.entity';
import { FindPaymentController } from './find-payment.controller';
import { FindPaymentUseCase } from './find-payment.use-case';
import { NotAcceptableException, NotFoundException } from '@nestjs/common';

describe('FindPaymentController', () => {
  let controller: FindPaymentController;
  let useCase: FindPaymentUseCase;

  beforeEach(() => {
    useCase = {
      find: jest.fn(),
    } as unknown as FindPaymentUseCase;

    controller = new FindPaymentController(useCase);
  });

  it('deve retornar um pagamento válido', async () => {
    const mockPagamento: Pagamento = { id: 1, value: 100 } as Pagamento;
    (useCase.find as jest.Mock).mockResolvedValue(mockPagamento);

    const result = await controller.find(1);

    expect(result).toEqual(mockPagamento);
    expect(useCase.find).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotAcceptableException se o id não for um número', async () => {
    await expect(controller.find('abc' as any)).rejects.toThrow(
      NotAcceptableException,
    );
  });

  it('deve lançar NotFoundException se o pagamento não for encontrado', async () => {
    (useCase.find as jest.Mock).mockRejectedValue(new NotFoundException());

    await expect(controller.find(999)).rejects.toThrow(NotFoundException);
    expect(useCase.find).toHaveBeenCalledWith(999);
  });
});
