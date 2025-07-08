import { FindPersonUseCase } from './find-person.use-case';
import { Pessoa } from 'src/person/models/entity/person.entity';
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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Pessoa')
@ApiBearerAuth('access-token')
@Controller('person')
@UseGuards(AuthGuard('jwt'))
export class FindPersonController {
  constructor(
    @Inject(FindPersonUseCase)
    private readonly personService: FindPersonUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca pessoa por ID' })
  @ApiOkResponse({})
  @ApiNotFoundResponse({ description: 'Pessoa não encontrada.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<Pessoa> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida; era esperado um ID numérico válido.',
      });
    }
    return await this.personService.find(id);
  }
}
