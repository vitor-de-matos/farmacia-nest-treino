import { DeletePersonUseCase } from './delete-person.use-case';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  Delete,
  Inject,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Pessoa')
@ApiBearerAuth('access-token')
@Controller('person')
@UseGuards(AuthGuard('jwt'))
export class DeletePersonController {
  constructor(
    @Inject(DeletePersonUseCase)
    private readonly personService: DeletePersonUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir uma pessoa' })
  @ApiOkResponse({ description: 'Pessoa removida com sucesso' })
  @ApiNotFoundResponse({ description: 'Pessoa não encontrada.' })
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
    return 'Pessoa removida com sucesso';
  }
}
