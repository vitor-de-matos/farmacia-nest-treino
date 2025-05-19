import { Module } from '@nestjs/common';
import { CreateEmployeeLoginController } from './use-cases/create-employee-login/create-employee-login.controller';
import { FindEmployeeLoginController } from './use-cases/find-employee-login/find-employee-login.controller';
import { FindAllEmployeeLoginController } from './use-cases/find-all-employee-login-filtered/find-all-employee-login.controller';
import { UpdateEmployeeLoginController } from './use-cases/update-employee-login/update-employee-login.controller';
import { DeleteEmployeeLoginController } from './use-cases/delete-employee-login/delete-employee-login.controller';
import { CreateEmployeeLoginUseCase } from './use-cases/create-employee-login/create-employee-login.use-case';
import { FindEmployeeLoginUseCase } from './use-cases/find-employee-login/find-employee-login.use-case';
import { FindAllEmployeeLoginUseCase } from './use-cases/find-all-employee-login-filtered/find-all-employee-login.use-case';
import { UpdateEmployeeLoginUseCase } from './use-cases/update-employee-login/update-employee-login.use-case';
import { DeleteEmployeeLoginUseCase } from './use-cases/delete-employee-login/delete-employee-login.use-case';
import { EmployeeLoginRepository } from './models/repository/employee-login.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionarioLogin } from './models/entity/employee-login.entity';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';

@Module({
  imports: [TypeOrmModule.forFeature([FuncionarioLogin], DB_PG_DATABASE)],
  controllers: [
    CreateEmployeeLoginController,
    FindEmployeeLoginController,
    FindAllEmployeeLoginController,
    UpdateEmployeeLoginController,
    DeleteEmployeeLoginController,
  ],
  providers: [
    CreateEmployeeLoginUseCase,
    FindEmployeeLoginUseCase,
    FindAllEmployeeLoginUseCase,
    UpdateEmployeeLoginUseCase,
    DeleteEmployeeLoginUseCase,
    EmployeeLoginRepository,
    { provide: 'IEmployeeLoginRepo', useExisting: EmployeeLoginRepository },
  ],
  exports: ['IEmployeeLoginRepo'],
})
export class EmployeeLoginModule {}
