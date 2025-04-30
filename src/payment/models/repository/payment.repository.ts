import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { UpdatePaymentDTO } from '../dtos/update-paymente.dto';
import { CreatePaymentDTO } from '../dtos/create-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { FindPaymentDTO } from '../dtos/find-payment.dto';
import { IPaymentRepo } from '../interface/payment-repo.interface';
import { Pagamento } from '../entity/payment.entity';

@Injectable()
export class PaymentRepository implements IPaymentRepo {
  constructor(
    @InjectRepository(Pagamento, DB_PG_DATABASE)
    private readonly repository: Repository<Pagamento>,
  ) {}

  async create(paymentDTO: CreatePaymentDTO): Promise<number> {
    const result = await this.repository.save(paymentDTO);
    return result.id;
  }

  async find(filters: FindPaymentDTO): Promise<{
    data: Pagamento[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<Pagamento> = {
      where: {
        ...(filters.paymentMethod && {
          paymentMethod: filters.paymentMethod,
        }),
        ...(filters.status && { status: filters.status }),
        ...(filters.saleId && { sale: { id: filters.saleId } }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
    };

    const [payment, totalItems] =
      await this.repository.findAndCount(queryOptions);

    const totalPages = filters.quantity
      ? Math.ceil(totalItems / filters.quantity)
      : 1;
    const currentPage = filters.page || 1;
    return { data: payment, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<Pagamento | undefined> {
    const payment = await this.repository.findOne({ where: { id: id } });
    if (!payment) {
      throw new NotFoundException({ message: 'Item da venda não encontrado' });
    }
    return payment;
  }

  async update(Id: number, paymentDTO: UpdatePaymentDTO): Promise<Pagamento> {
    const payment = await this.repository.findOne({ where: { id: Id } });

    const UpdatePayment = await this.repository.save({
      ...payment,
      ...paymentDTO,
    });

    return UpdatePayment;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
