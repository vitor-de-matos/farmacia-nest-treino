import { UpdateEmployeeLoginUseCase } from './update-employee-login.use-case';
import { UpdateEmployeeLoginDTO } from 'src/employee-login/models/dtos/update-employee-login.dto';
import { FuncionarioLogin } from 'src/employee-login/models/entity/employee-login.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  Inject,
  Param,
  Patch,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@ApiTags('Login Funcionarios')
@ApiBearerAuth('access-token')
@Controller('employeeLogin')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class UpdateEmployeeLoginController {
  constructor(
    @Inject(UpdateEmployeeLoginUseCase)
    private readonly employeeService: UpdateEmployeeLoginUseCase,
  ) {}

  @ApiOperation({ summary: 'Modifica pessoa' })
  @ApiBody({ type: UpdateEmployeeLoginDTO })
  @ApiOkResponse({ description: 'pessoa atualizada' })
  @ApiNotFoundResponse({ description: 'pessoa não encontrada.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() employeeDTO: UpdateEmployeeLoginDTO,
  ): Promise<FuncionarioLogin> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    return await this.employeeService.update(id, employeeDTO);
  }
}
