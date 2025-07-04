import { IPaymentRepo } from 'src/payment/models/interface/payment-repo.interface';
import { FindAllPaymentUseCase } from './find-all-payment.use-case';
import { FindPaymentDTO } from 'src/payment/models/dtos/find-payment.dto';
import { Pagamento } from 'src/payment/models/entity/payment.entity';

describe('FindAllPaymentUseCase', () => {
  let useCase: FindAllPaymentUseCase;
  let mockRepo: jest.Mocked<IPaymentRepo>;

  beforeEach(() => {
    mockRepo = {
      find: jest.fn(),
    } as unknown as jest.Mocked<IPaymentRepo>;

    useCase = new FindAllPaymentUseCase(mockRepo);
  });

  it('deve retornar lista paginada de pagamentos', async () => {
    const dto: FindPaymentDTO = { page: 1, quantity: 10 };
    const mockResponse = {
      data: [
        { id: 1, value: 100 },
        { id: 2, value: 200 },
      ] as Pagamento[],
      currentPage: 1,
      totalPages: 1,
      totalItems: 2,
    };

    mockRepo.find.mockResolvedValue(mockResponse);

    const result = await useCase.find(dto);

    expect(result).toEqual(mockResponse);
    expect(mockRepo.find).toHaveBeenCalledWith(dto);
  });
});
