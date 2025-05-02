import { FindAllPersonController } from './use-cases/find-all-person-filtered/find-all-person.controller';
import { CreatePersonController } from './use-cases/create-person/create-person.controller';
import { UpdatePersonController } from './use-cases/update-person/update-person.controller';
import { DeletePersonController } from './use-cases/delete-person/delete-person.controller';
import { FindAllPersonUseCase } from './use-cases/find-all-person-filtered/find-all-person.use-case';
import { FindPersonController } from './use-cases/find-person/find-person.controller';
import { CreatePersonUseCase } from './use-cases/create-person/create-person.use-case';
import { UpdatePersonUseCase } from './use-cases/update-person/update-person.use-case';
import { DeletePersonUseCase } from './use-cases/delete-person/delete-person.use-case';
import { FindPersonUseCase } from './use-cases/find-person/find-person.use-case';
import { PersonRepository } from './models/repository/person.repository';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from './models/entity/person.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa], DB_PG_DATABASE)],
  controllers: [
    CreatePersonController,
    FindPersonController,
    FindAllPersonController,
    UpdatePersonController,
    DeletePersonController,
  ],
  providers: [
    CreatePersonUseCase,
    FindPersonUseCase,
    FindAllPersonUseCase,
    UpdatePersonUseCase,
    DeletePersonUseCase,
    PersonRepository,
    { provide: 'IPersonRepo', useExisting: PersonRepository },
  ],
  exports: ['IPersonRepo'],
})
export class PersonModule {}
