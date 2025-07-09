import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { FindAllPersonUseCase } from './find-all-person.use-case';
import { FindPersonDTO } from 'src/person/models/dtos/find-person.dto';
import { Pessoa } from 'src/person/models/entity/person.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Pessoa')
@ApiBearerAuth('access-token')
@Controller('person')
@UseGuards(AuthGuard('jwt'))
export class FindAllPersonController {
  constructor(
    @Inject(FindAllPersonUseCase)
    private readonly personService: FindAllPersonUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca varias pessoas' })
  @ApiOkResponse({})
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() personDTO: FindPersonDTO): Promise<{
    data: Pessoa[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.personService.find(personDTO);
  }
}
