import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDTO } from 'src/payment/models/dtos/create-payment.dto';
import { IPaymentRepo } from 'src/payment/models/interface/payment-repo.interface';

@Injectable()
export class CreatePaymentUseCase {
  constructor(
    @Inject('IPaymentRepo')
    private readonly paymentRepository: IPaymentRepo,
  ) {}

  async create(itemSaleDTO: CreatePaymentDTO): Promise<number> {
    const itemSaleCreated = await this.paymentRepository.create(itemSaleDTO);
    if (isNaN(itemSaleCreated)) {
      throw new BadRequestException({
        message: 'Resposta invalida; entre em contato com o suporte',
      });
    }
    return itemSaleCreated;
  }
}
