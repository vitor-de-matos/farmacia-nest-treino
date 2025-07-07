import { FindAllProdutoController } from './use-cases/find-all-produto-filtered/find-all-product.controller';
import { CreateProdutoController } from './use-cases/create-produto/create-product.controller';
import { UpdateProdutoController } from './use-cases/update-produto/update-product.controller';
import { DeleteProdutoController } from './use-cases/delete-produto/delete-product.controller';
import { FindAllProdutosUseCase } from './use-cases/find-all-produto-filtered/find-all-product.use-case';
import { FindProdutoController } from './use-cases/find-produto/find-product.controller';
import { UpdateProdutoUseCase } from './use-cases/update-produto/update-product.use-case';
import { DeleteProdutoUseCase } from './use-cases/delete-produto/delete-product.use-case';
import { CreateProdutoUseCase } from './use-cases/create-produto/create-product.use-case';
import { FindProdutoUseCase } from './use-cases/find-produto/find-product.use-case';
import { ManufacturerModule } from 'src/manufacturer/manufacturer.module';
import { forwardRef, Module } from '@nestjs/common';
import { ProductRepository } from './models/repository/produto.repository';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { CategoryModule } from 'src/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { MidiaModule } from 'src/media/media.module';
import { Produto } from './models/entity/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Produto], DB_PG_DATABASE),
    SharedModule,
    forwardRef(() => MidiaModule),
    CategoryModule,
    ManufacturerModule,
  ],
  controllers: [
    CreateProdutoController,
    FindProdutoController,
    FindAllProdutoController,
    UpdateProdutoController,
    DeleteProdutoController,
  ],
  providers: [
    CreateProdutoUseCase,
    FindProdutoUseCase,
    FindAllProdutosUseCase,
    UpdateProdutoUseCase,
    DeleteProdutoUseCase,
    ProductRepository,
    {
      provide: 'IProductRepo',
      useExisting: ProductRepository,
    },
  ],
  exports: ['IProductRepo'],
})
export class ProductModule {}
