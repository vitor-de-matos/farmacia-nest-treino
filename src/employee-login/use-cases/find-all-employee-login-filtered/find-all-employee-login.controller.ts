import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { FindAllEmployeeLoginUseCase } from './find-all-employee-login.use-case';
import { FindEmployeeLoginDTO } from 'src/employee-login/models/dtos/find-employee-login.dto';
import { FuncionarioLogin } from 'src/employee-login/models/entity/employee-login.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@ApiTags('Login Funcionarios')
@ApiBearerAuth('access-token')
@Controller('employeeLogin')
@UseGuards(AuthGuard('jwt'), AdminGuard)
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
