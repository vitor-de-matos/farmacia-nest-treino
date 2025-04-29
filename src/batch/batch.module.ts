import { FindAllBatchController } from './use-cases/find-all-batchs-filtered/find-all-batchs.controller';
import { CreateBatchController } from './use-cases/create-batch/create-batch.controller';
import { DeleteBatchController } from './use-cases/delete-batch/delete-batch.controller';
import { UpdateBatchController } from './use-cases/update-batch/update-batch.controller';
import { FindAllBatchUseCase } from './use-cases/find-all-batchs-filtered/find-all-batchs.use-case';
import { FindBatchController } from './use-cases/find-batch/find-batch.controller';
import { CreateBatchUseCase } from './use-cases/create-batch/create-batch.use-case';
import { UpdateBatchUseCase } from './use-cases/update-batch/update-batch.use-case';
import { DeleteBatchUseCase } from './use-cases/delete-batch/delete-batch.use-case';
import { FindBatchUseCase } from './use-cases/find-batch/find-batch.use-case';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { BatchRepository } from './models/repository/lote.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Lote } from './models/entity/batch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lote], DB_PG_DATABASE)],
  controllers: [
    CreateBatchController,
    FindBatchController,
    FindAllBatchController,
    UpdateBatchController,
    DeleteBatchController,
  ],
  providers: [
    CreateBatchUseCase,
    FindBatchUseCase,
    FindAllBatchUseCase,
    UpdateBatchUseCase,
    DeleteBatchUseCase,
    BatchRepository,
    { provide: 'ILoteRepo', useExisting: BatchRepository },
  ],
  exports: ['ILoteRepo'],
})
export class LoteModule {}
