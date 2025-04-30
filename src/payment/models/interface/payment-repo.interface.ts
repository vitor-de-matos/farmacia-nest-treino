import { CreatePaymentDTO } from '../dtos/create-payment.dto';
import { UpdatePaymentDTO } from '../dtos/update-paymente.dto';
import { FindPaymentDTO } from '../dtos/find-payment.dto';
import { Pagamento } from '../entity/payment.entity';

export interface IPaymentRepo {
  create(paymentDTO: CreatePaymentDTO): Promise<number>;
  find(filters: FindPaymentDTO): Promise<{
    data: Pagamento[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<Pagamento | undefined>;
  update(id: number, paymentDTO: UpdatePaymentDTO): Promise<Pagamento>;
  delete(id: number): Promise<void>;
}
