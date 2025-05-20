import { FindAllSalesController } from './use-cases/find-all-sales-filtered/find-all-sales.controller';
import { UpdateSalesController } from './use-cases/update-sales/update-sales.controller';
import { DeleteSalesController } from './use-cases/delete-sales/delete-sales.controller';
import { CreateSalesController } from './use-cases/create-sales/create-sales.controller';
import { FindAllSalesUseCase } from './use-cases/find-all-sales-filtered/find-all-sales.use-case';
import { FindsalesController } from './use-cases/find-sales/find-sales.controller';
import { CreateSalesUseCase } from './use-cases/create-sales/create-sales.use-case';
import { UpdateSalesUseCase } from './use-cases/update-sales/update-sales.use-case';
import { DeleteSalesUseCase } from './use-cases/delete-sales/delete-sales.use-case';
import { FindSalesUseCase } from './use-cases/find-sales/find-sales.use-case';
import { SalesRepository } from './models/repository/sales.repository';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Venda } from './models/entity/sales.entity';
import { GenerateInvoiceController } from './use-cases/generate-invoice/generate-invoice.controller';
import { GenerateInvoiceUseCase } from './use-cases/generate-invoice/generate-invoice.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Venda], DB_PG_DATABASE)],
  controllers: [
    CreateSalesController,
    FindsalesController,
    FindAllSalesController,
    UpdateSalesController,
    DeleteSalesController,
    GenerateInvoiceController,
  ],
  providers: [
    CreateSalesUseCase,
    FindSalesUseCase,
    FindAllSalesUseCase,
    UpdateSalesUseCase,
    DeleteSalesUseCase,
    GenerateInvoiceUseCase,
    SalesRepository,
    { provide: 'ISalesRepo', useExisting: SalesRepository },
  ],
  exports: ['ISalesRepo'],
})
export class SalesModule {}
