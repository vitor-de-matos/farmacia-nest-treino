import { FindAllMidiaController } from './use-case/find-all-media-filtered/find-all-media.controller';
import { DeleteMidiaController } from './use-case/delete-media/delete-media.controller';
import { CreateMidiaController } from './use-case/create-media/create-media.controller';
import { UpdateMidiaController } from './use-case/update-media/update-media.controller';
import { FindAllMidiaUseCase } from './use-case/find-all-media-filtered/find-all-media.use-case';
import { FindMidiaController } from './use-case/find-media/find-media.controller';
import { UpdateMidiaUseCase } from './use-case/update-media/update-media.use-case';
import { CreateMidiaUseCase } from './use-case/create-media/create-media.use-case';
import { DeleteMidiaUseCase } from './use-case/delete-media/delete-media.use-case';
import { forwardRef, Module } from '@nestjs/common';
import { FindMidiaUseCase } from './use-case/find-media/find-media.use-case';
import { MidiaRepository } from './models/repository/midia.repository';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { ProductModule } from 'src/products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { Midia } from './models/entity/midia.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Midia], DB_PG_DATABASE),
    SharedModule,
    forwardRef(() => ProductModule),
  ],
  controllers: [
    CreateMidiaController,
    FindAllMidiaController,
    FindMidiaController,
    UpdateMidiaController,
    DeleteMidiaController,
  ],
  providers: [
    CreateMidiaUseCase,
    FindAllMidiaUseCase,
    FindMidiaUseCase,
    UpdateMidiaUseCase,
    DeleteMidiaUseCase,
    MidiaRepository,
    { provide: 'IMidiaRepo', useExisting: MidiaRepository },
  ],
  exports: [
    'IMidiaRepo',
    CreateMidiaUseCase,
    UpdateMidiaUseCase,
    DeleteMidiaUseCase,
  ],
})
export class MidiaModule {}
