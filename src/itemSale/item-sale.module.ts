import { FindAllItemSaleController } from './use-cases/find-all-item-sale-filtered/find-all-item-sale.controller';
import { CreateItemSaleController } from './use-cases/create-item-sale/create-item-sale.controller';
import { UpdateItemSaleController } from './use-cases/update-item-sale/update-item-sale.controller';
import { DeleteItemSaleController } from './use-cases/delete-item-sale/delete-item-sale.controller';
import { FindItemSaleController } from './use-cases/find-item-sale/find-item-sale.controller';
import { FindAllItemSaleUseCase } from './use-cases/find-all-item-sale-filtered/find-all-item-sale.use-case';
import { CreateItemSaleUseCase } from './use-cases/create-item-sale/create-item-sale.use-case';
import { UpdateItemSaleUseCase } from './use-cases/update-item-sale/update-item-sale.use-case';
import { DeleteItemSaleUseCase } from './use-cases/delete-item-sale/delete-item-sale.use-case';
import { FindItemSaleUseCase } from './use-cases/find-item-sale/find-item-sale.use-case';
import { ItemSaleRepository } from './models/repository/itemSale.repository';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemVenda } from './models/entity/item-sale.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([ItemVenda], DB_PG_DATABASE)],
  controllers: [
    CreateItemSaleController,
    FindItemSaleController,
    FindAllItemSaleController,
    UpdateItemSaleController,
    DeleteItemSaleController,
  ],
  providers: [
    CreateItemSaleUseCase,
    FindItemSaleUseCase,
    FindAllItemSaleUseCase,
    UpdateItemSaleUseCase,
    DeleteItemSaleUseCase,
    ItemSaleRepository,
    { provide: 'IItemSaleRepo', useExisting: ItemSaleRepository },
  ],
  exports: ['IItemSaleRepo'],
})
export class ItemSaleModule {}
