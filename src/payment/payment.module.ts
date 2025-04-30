import { FindAllPaymentController } from './use-cases/find-all-payment-filtered/find-all-payment.controller';
import { CreatePaymentController } from './use-cases/create-payment/create-payment.controller';
import { UpdatePaymentController } from './use-cases/update-payment/update-payment.controller';
import { DeletePaymentController } from './use-cases/delete-payment/delete-payment.controller';
import { FindAllPaymentUseCase } from './use-cases/find-all-payment-filtered/find-all-payment.use-case';
import { FindPaymentController } from './use-cases/find-payment/find-payment.controller';
import { CreatePaymentUseCase } from './use-cases/create-payment/create-payment.use-case';
import { UpdatePaymentUseCase } from './use-cases/update-payment/update-payment.use-case';
import { DeletePaymentUseCase } from './use-cases/delete-payment/delete-payment.use-case';
import { FindPaymentUseCase } from './use-cases/find-payment/find-payment.use-case';
import { PaymentRepository } from './models/repository/payment.repository';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagamento } from './models/entity/payment.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Pagamento], DB_PG_DATABASE)],
  controllers: [
    CreatePaymentController,
    FindPaymentController,
    FindAllPaymentController,
    UpdatePaymentController,
    DeletePaymentController,
  ],
  providers: [
    CreatePaymentUseCase,
    FindPaymentUseCase,
    FindAllPaymentUseCase,
    UpdatePaymentUseCase,
    DeletePaymentUseCase,
    PaymentRepository,
    { provide: 'IPaymentRepo', useExisting: PaymentRepository },
  ],
  exports: ['IPaymentRepo'],
})
export class PaymentModule {}
