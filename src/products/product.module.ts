import { FindAllProdutoController } from './use-cases/find-all-produto-filtered/find-all-produto.controller';
import { CreateProdutoController } from './use-cases/create-produto/create-produto.controller';
import { UpdateProdutoController } from './use-cases/update-produto/update-produto.controller';
import { DeleteProdutoController } from './use-cases/delete-produto/delete-produto.controller';
import { FindAllProdutosUseCase } from './use-cases/find-all-produto-filtered/find-all-produto.use-case';
import { FindProdutoController } from './use-cases/find-produto/find-produto.controller';
import { UpdateProdutoUseCase } from './use-cases/update-produto/update-produto.use-case';
import { DeleteProdutoUseCase } from './use-cases/delete-produto/delete-produto.use-case';
import { CreateProdutoUseCase } from './use-cases/create-produto/create-produto.use-case';
import { FindProdutoUseCase } from './use-cases/find-produto/find-produto.use-case';
import { forwardRef, Module } from '@nestjs/common';
import { ProdutoRepository } from './models/repository/produto.repository';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { MidiaModule } from 'src/media/media.module';
import { Produto } from './models/entity/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Produto], DB_PG_DATABASE),
    SharedModule,
    forwardRef(() => MidiaModule),
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
    ProdutoRepository,
    {
      provide: 'IProduypRepo',
      useExisting: ProdutoRepository,
    },
  ],
  exports: ['IProdutoRepo'],
})
export class ProductModule {}
