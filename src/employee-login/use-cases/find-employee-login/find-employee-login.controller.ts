import { FindEmployeeLoginUseCase } from './find-employee-login.use-case';
import { FuncionarioLogin } from 'src/employee-login/models/entity/employee-login.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  Inject,
  Param,
  Get,
} from '@nestjs/common';

@ApiTags('Login Funcionarios')
//@ApiBearerAuth('access-token')
@Controller('employeeLogin')
export class FindEmployeeLoginController {
  constructor(
    @Inject(FindEmployeeLoginUseCase)
    private readonly employeeLoginService: FindEmployeeLoginUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca login de funcionario por ID' })
  @ApiOkResponse({})
  @ApiNotFoundResponse({ description: 'Login de funcionario não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<FuncionarioLogin> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida; era esperado um ID numérico válido.',
      });
    }
    return await this.employeeLoginService.find(id);
  }
}
