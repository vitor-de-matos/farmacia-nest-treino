import { UpdatePaymentController } from './update-payment.controller';
import { UpdatePaymentUseCase } from './update-payment.use-case';
import { UpdatePaymentDTO } from 'src/payment/models/dtos/update-paymente.dto';
import { Pagamento } from 'src/payment/models/entity/payment.entity';
import {
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

describe('UpdatePaymentController', () => {
  let controller: UpdatePaymentController;
  let mockUseCase: UpdatePaymentUseCase;

  beforeEach(() => {
    mockUseCase = {
      update: jest.fn(),
    } as unknown as UpdatePaymentUseCase;

    controller = new UpdatePaymentController(mockUseCase);
  });

  it('deve atualizar um pagamento com sucesso', async () => {
    const id = 1;
    const dto: UpdatePaymentDTO = { value: 300 } as UpdatePaymentDTO;
    const updatedPayment: Pagamento = { id, value: 300 } as Pagamento;

    (mockUseCase.update as jest.Mock).mockResolvedValue(updatedPayment);

    const result = await controller.update(id, dto);

    expect(result).toEqual(updatedPayment);
    expect(mockUseCase.update).toHaveBeenCalledWith(id, dto);
  });

  it('deve lançar NotAcceptableException se o ID não for numérico', async () => {
    const dto: UpdatePaymentDTO = { valor: 100 } as UpdatePaymentDTO;
    await expect(controller.update('abc' as any, dto)).rejects.toThrow(
      NotAcceptableException,
    );
  });

  it('deve lançar NotFoundException se o pagamento não for encontrado', async () => {
    const dto: UpdatePaymentDTO = { valor: 100 } as UpdatePaymentDTO;

    (mockUseCase.update as jest.Mock).mockRejectedValue(
      new NotFoundException(),
    );

    await expect(controller.update(999, dto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('deve lançar InternalServerErrorException se houver erro ao atualizar', async () => {
    const dto: UpdatePaymentDTO = { valor: 100 } as UpdatePaymentDTO;

    (mockUseCase.update as jest.Mock).mockRejectedValue(
      new InternalServerErrorException(),
    );

    await expect(controller.update(1, dto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
