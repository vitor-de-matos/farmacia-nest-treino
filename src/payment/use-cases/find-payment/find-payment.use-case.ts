import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPaymentRepo } from 'src/payment/models/interface/payment-repo.interface';
import { Pagamento } from 'src/payment/models/entity/payment.entity';

@Injectable()
export class FindPaymentUseCase {
  constructor(
    @Inject('IPaymentRepo')
    private readonly paymentRepository: IPaymentRepo,
  ) {}

  async find(paymentId: number): Promise<Pagamento> {
    const payment = await this.paymentRepository.findById(paymentId);
    if (!payment) {
      throw new NotFoundException({
        message: 'Pagamento não encontrado',
      });
    }
    return payment;
  }
}
