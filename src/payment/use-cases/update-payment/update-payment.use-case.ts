import { UpdatePaymentDTO } from 'src/payment/models/dtos/update-paymente.dto';
import { IPaymentRepo } from 'src/payment/models/interface/payment-repo.interface';
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class UpdatePaymentUseCase {
  constructor(
    @Inject('IPaymentRepo')
    private readonly paymentRepository: IPaymentRepo,
  ) {}

  async update(paymentId: number, paymentDTO: UpdatePaymentDTO) {
    const payment = await this.paymentRepository.findById(paymentId);
    if (!payment) {
      throw new NotFoundException({
        message: 'item da venda não encontrado',
      });
    }

    const updated = await this.paymentRepository.update(paymentId, paymentDTO);

    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar o pagamento entre em contato com o suporte',
      });
    }

    return updated;
  }
}
