import { TypeOrmModule } from '@nestjs/typeorm';
import { Estoque } from './models/entity/stock.entity';
import { Module } from '@nestjs/common';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { CreateStockController } from './use-cases/create-stock/create-stock.controller';
import { FindStockController } from './use-cases/find-stock/find-stock.controller';
import { FindAllStockController } from './use-cases/find-all-stock-filtered/find-all-stock.controller';
import { UpdateStockController } from './use-cases/update-stock/update-stock.controller';
import { DeleteStockController } from './use-cases/delete-stock/delete-stock.controller';
import { CreateStockUseCase } from './use-cases/create-stock/create-stock.use-case';
import { FindAllStockUseCase } from './use-cases/find-all-stock-filtered/find-all-stock.use-case';
import { UpdateStockUseCase } from './use-cases/update-stock/update-stock.use-case';
import { DeleteStockUseCase } from './use-cases/delete-stock/delete-stock.use-case';
import { StockRepository } from './models/repository/stock.repository';
import { SalesModule } from 'src/sales/sales.module';
import { FindStockUseCase } from './use-cases/find-stock/find-stock.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Estoque], DB_PG_DATABASE), SalesModule],
  controllers: [
    CreateStockController,
    FindStockController,
    FindAllStockController,
    UpdateStockController,
    DeleteStockController,
  ],
  providers: [
    CreateStockUseCase,
    FindStockUseCase,
    FindAllStockUseCase,
    UpdateStockUseCase,
    DeleteStockUseCase,
    StockRepository,
    { provide: 'IStockRepo', useExisting: StockRepository },
  ],
  exports: ['IStockRepo'],
})
export class StockModule {}
