import { Inject, Injectable } from '@nestjs/common';
import { FindPaymentDTO } from 'src/payment/models/dtos/find-payment.dto';
import { IPaymentRepo } from 'src/payment/models/interface/payment-repo.interface';
import { Pagamento } from 'src/payment/models/entity/payment.entity';

@Injectable()
export class FindAllPaymentUseCase {
  constructor(
    @Inject('IPaymentRepo')
    private readonly paymentRepository: IPaymentRepo,
  ) {}

  async find(paymentDTO: FindPaymentDTO): Promise<{
    data: Pagamento[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.paymentRepository.find(paymentDTO);
  }
}
