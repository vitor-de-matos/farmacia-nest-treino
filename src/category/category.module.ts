import { FindAllCategoryController } from './use-cases/find-all-categories-filtered/find-all-categories.controller';
import { CreateCategoryController } from './use-cases/create-category/create-category.controller';
import { UpdateCategoryController } from './use-cases/update-category/update-category.controller';
import { DeleteCategoryController } from './use-cases/delete-category/delete-category.controller';
import { FindAllCategoryUseCase } from './use-cases/find-all-categories-filtered/find-all-categories.use-case';
import { FindCategoryController } from './use-cases/find-category/find-category.controller';
import { CreateCategoryUseCase } from './use-cases/create-category/create-category.use-case';
import { UpdateCategoryUseCase } from './use-cases/update-category/update-category.use-case';
import { DeleteCategoryUseCase } from './use-cases/delete-category/delete-category.use-case';
import { FindCategoryUseCase } from './use-cases/find-category/find-category.use-case';
import { CategoryRepository } from './models/repository/category.repository';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './models/entity/category.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria], DB_PG_DATABASE)],
  controllers: [
    CreateCategoryController,
    FindAllCategoryController,
    FindCategoryController,
    UpdateCategoryController,
    DeleteCategoryController,
  ],
  providers: [
    CreateCategoryUseCase,
    FindAllCategoryUseCase,
    FindCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    CategoryRepository,
    { provide: 'ICategoryRepo', useExisting: CategoryRepository },
  ],
  exports: ['ICategoryRepo'],
})
export class CategoryModule {}
