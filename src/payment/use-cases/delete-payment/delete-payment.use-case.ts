import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPaymentRepo } from 'src/payment/models/interface/payment-repo.interface';

@Injectable()
export class DeletePaymentUseCase {
  constructor(
    @Inject('IPaymentRepo')
    private readonly paymentRepository: IPaymentRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const payment = await this.paymentRepository.findById(id);

    if (!payment) {
      throw new NotFoundException({
        message: 'Pagamento não encontrado',
      });
    }

    await this.paymentRepository.delete(id);
  }
}
