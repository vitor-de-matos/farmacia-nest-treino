import { FindAllStockController } from './use-cases/find-all-stock-filtered/find-all-stock.controller';
import { CreateStockController } from './use-cases/create-stock/create-stock.controller';
import { UpdateStockController } from './use-cases/update-stock/update-stock.controller';
import { DeleteStockController } from './use-cases/delete-stock/delete-stock.controller';
import { FindStockController } from './use-cases/find-stock/find-stock.controller';
import { FindAllStockUseCase } from './use-cases/find-all-stock-filtered/find-all-stock.use-case';
import { CreateStockUseCase } from './use-cases/create-stock/create-stock.use-case';
import { UpdateStockUseCase } from './use-cases/update-stock/update-stock.use-case';
import { DeleteStockUseCase } from './use-cases/delete-stock/delete-stock.use-case';
import { FindStockUseCase } from './use-cases/find-stock/find-stock.use-case';
import { StockRepository } from './models/repository/stock.repository';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesModule } from 'src/sales/sales.module';
import { Estoque } from './models/entity/stock.entity';
import { Module } from '@nestjs/common';

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
