import { FindAllPaymentController } from './find-all-payment.controller';
import { FindAllPaymentUseCase } from './find-all-payment.use-case';
import { FindPaymentDTO } from 'src/payment/models/dtos/find-payment.dto';
import { Pagamento } from 'src/payment/models/entity/payment.entity';

describe('FindAllPaymentController', () => {
  let controller: FindAllPaymentController;
  let useCase: FindAllPaymentUseCase;

  beforeEach(() => {
    useCase = {
      find: jest.fn(),
    } as unknown as FindAllPaymentUseCase;

    controller = new FindAllPaymentController(useCase);
  });

  it('deve retornar lista paginada de pagamentos', async () => {
    const dto: FindPaymentDTO = { page: 1, quantity: 10 };
    const mockResponse = {
      data: [
        { id: 1, value: 100 } as Pagamento,
        { id: 2, value: 200 } as Pagamento,
      ],
      currentPage: 1,
      totalPages: 1,
      totalItems: 2,
    };

    (useCase.find as jest.Mock).mockResolvedValue(mockResponse);

    const result = await controller.find(dto);

    expect(result).toEqual(mockResponse);
    expect(useCase.find).toHaveBeenCalledWith(dto);
  });
});
