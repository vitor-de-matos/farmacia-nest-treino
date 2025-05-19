import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import { CreateEmployeeLoginDTO } from 'src/employee-login/models/dtos/create-employee-login.dto';
import { CreateEmployeeLoginUseCase } from './create-employee-login.use-case';

@ApiTags('Login Funcionarios')
//@ApiBearerAuth('access-token')
@Controller('employeeLogin')
export class CreateEmployeeLoginController {
  constructor(
    @Inject(CreateEmployeeLoginUseCase)
    private readonly employeeLoginService: CreateEmployeeLoginUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar login de funcionario' })
  @ApiBody({ type: CreateEmployeeLoginDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(
    @Body() employeeLoginDTO: CreateEmployeeLoginDTO,
  ): Promise<number> {
    return await this.employeeLoginService.create(employeeLoginDTO);
  }
}
