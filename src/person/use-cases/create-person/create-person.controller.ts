import { CreatePersonUseCase } from './create-person.use-case';
import { CreatePersonDTO } from 'src/person/models/dtos/create-person.dto';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  Inject,
  Post,
  Body,
} from '@nestjs/common';

@ApiTags('Pessoa')
@ApiBearerAuth('access-token')
@Controller('person')
export class CreatePersonController {
  constructor(
    @Inject(CreatePersonUseCase)
    private readonly personService: CreatePersonUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar pessoa' })
  @ApiBody({ type: CreatePersonDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(@Body() personDTO: CreatePersonDTO): Promise<number> {
    if (personDTO.document.length != 11) {
      throw new NotAcceptableException({
        message: 'CPF deve conter 11 digitos',
      });
    }
    return await this.personService.create(personDTO);
  }
}
