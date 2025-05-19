import { Controller, Get, Inject, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindAllEmployeeLoginUseCase } from './find-all-employee-login.use-case';
import { FindEmployeeLoginDTO } from 'src/employee-login/models/dtos/find-employee-login.dto';
import { FuncionarioLogin } from 'src/employee-login/models/entity/employee-login.entity';

@ApiTags('Login Funcionarios')
//@ApiBearerAuth('access-token')
@Controller('employeeLogin')
export class FindAllEmployeeLoginController {
  constructor(
    @Inject(FindAllEmployeeLoginUseCase)
    private readonly employeeLoginService: FindAllEmployeeLoginUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca varios Login de funcionario' })
  @ApiOkResponse({})
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() EmployeeLoginDTO: FindEmployeeLoginDTO): Promise<{
    data: FuncionarioLogin[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.employeeLoginService.find(EmployeeLoginDTO);
  }
}
