import { FindAllBatchPromotionController } from './use-cases/find-all-batch-promotion-filtered/find-all-batch-promotion.controller';
import { UpdateBatchPromotionController } from './use-cases/update-batch-promotion/update-batch-promotion.controller';
import { CreateBatchPromotionController } from './use-cases/create-batch-promotion/create-batch-promotion.controller';
import { DeleteBatchPromotionController } from './use-cases/delete-batch-promotion/delete-batch-promotion.controller';
import { FindAllBatchPromotionUseCase } from './use-cases/find-all-batch-promotion-filtered/find-all-batch-promotion.use-case';
import { FindBatchPromotionController } from './use-cases/find-batch-promotion/find-batch.controller';
import { CreateBatchPromotionUseCase } from './use-cases/create-batch-promotion/create-batch-promotion.use-case';
import { UpdateBatchPromotionUseCase } from './use-cases/update-batch-promotion/update-batch-promotion.use-case';
import { DeleteBatchPromotionUseCase } from './use-cases/delete-batch-promotion/delete-batch-promotion.use-case';
import { FindBatchPromotionUseCase } from './use-cases/find-batch-promotion/find-batch.use-case';
import { BatchPromotionRepository } from './models/repository/batch-promotion.repository';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromocaoLote } from './models/entity/batch-promotion.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([PromocaoLote], DB_PG_DATABASE)],
  controllers: [
    CreateBatchPromotionController,
    FindBatchPromotionController,
    FindAllBatchPromotionController,
    UpdateBatchPromotionController,
    DeleteBatchPromotionController,
  ],
  providers: [
    CreateBatchPromotionUseCase,
    FindBatchPromotionUseCase,
    FindAllBatchPromotionUseCase,
    UpdateBatchPromotionUseCase,
    DeleteBatchPromotionUseCase,
    BatchPromotionRepository,
    { provide: 'IBatchPromotionRepo', useExisting: BatchPromotionRepository },
  ],
  exports: ['IBatchPromotionRepo'],
})
export class BatchPromotionModule {}
