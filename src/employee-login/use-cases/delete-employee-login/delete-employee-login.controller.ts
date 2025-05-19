import { DeleteEmployeeLoginUseCase } from './delete-employee-login.use-case';
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
  Delete,
  Inject,
  Param,
} from '@nestjs/common';

@ApiTags('Login Funcionarios')
//@ApiBearerAuth('access-token')
@Controller('employeeLogin')
export class DeleteEmployeeLoginController {
  constructor(
    @Inject(DeleteEmployeeLoginUseCase)
    private readonly personService: DeleteEmployeeLoginUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir um login de funcionario' })
  @ApiOkResponse({ description: 'Login de funcionario removido com sucesso' })
  @ApiNotFoundResponse({ description: 'Login de funcionario não encontrada.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    await this.personService.delete(id);
    return 'Login de funcionario removido com sucesso';
  }
}
