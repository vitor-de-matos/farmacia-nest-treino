import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { DeletePaymentController } from './delete-payment.controller';
import { DeletePaymentUseCase } from './delete-payment.use-case';

describe('DeletePaymentController', () => {
  let controller: DeletePaymentController;
  let mockDeleteUseCase: DeletePaymentUseCase;

  beforeEach(() => {
    mockDeleteUseCase = {
      delete: jest.fn(),
    } as unknown as DeletePaymentUseCase;

    controller = new DeletePaymentController(mockDeleteUseCase);
  });

  it('deve deletar um pagamento e retornar mensagem de sucesso', async () => {
    (mockDeleteUseCase.delete as jest.Mock).mockResolvedValue(undefined);
    const result = await controller.delete(1);
    expect(result).toBe('Pagamento removido com sucesso');
    expect(mockDeleteUseCase.delete).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotAcceptableException se o ID não for número', async () => {
    await expect(controller.delete('abc' as any)).rejects.toThrow(
      NotAcceptableException,
    );
  });

  it('deve lançar NotFoundException se o pagamento não for encontrado', async () => {
    (mockDeleteUseCase.delete as jest.Mock).mockRejectedValue(
      new NotFoundException(),
    );
    await expect(controller.delete(123)).rejects.toThrow(NotFoundException);
  });
});
