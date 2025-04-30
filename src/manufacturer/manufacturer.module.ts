import { FindAllManufacturerController } from './use-cases/find-all-manufacturer-filtered/find-all-manufacturer.controller';
import { CreateManufacturerController } from './use-cases/create-manufacturer/create-manufacturer.controller';
import { UpdateManufacturerController } from './use-cases/update-manufacturer/update-manufacturer.controller';
import { DeleteManufacturerController } from './use-cases/delete-manufacturer/delete-manufacturer.controller';
import { FindManufacturerController } from './use-cases/find-manufacturer/find-manufacturer.controller';
import { FindAllManufacturerUseCase } from './use-cases/find-all-manufacturer-filtered/find-all-manufacturer.use-case';
import { CreateManufacturerUseCase } from './use-cases/create-manufacturer/create-manufacturer.use-case';
import { UpdateManufacturerUseCase } from './use-cases/update-manufacturer/update-manufacturer.use-case';
import { DeleteManufacturerUseCase } from './use-cases/delete-manufacturer/delete-manufacturer.use-case';
import { FindManufacturerUseCase } from './use-cases/find-manufacturer/find-manufacturer.use-case';
import { manufacturerRepository } from './models/repository/manufacturer.repository';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fabricante } from './models/entity/manufacturer.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Fabricante], DB_PG_DATABASE)],
  controllers: [
    CreateManufacturerController,
    FindManufacturerController,
    FindAllManufacturerController,
    UpdateManufacturerController,
    DeleteManufacturerController,
  ],
  providers: [
    CreateManufacturerUseCase,
    FindManufacturerUseCase,
    FindAllManufacturerUseCase,
    UpdateManufacturerUseCase,
    DeleteManufacturerUseCase,
    manufacturerRepository,
    { provide: 'IManufacturerRepo', useExisting: manufacturerRepository },
  ],
  exports: ['IManufacturerRepo'],
})
export class ManufacturerModule {}
