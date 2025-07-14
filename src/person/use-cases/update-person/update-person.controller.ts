import { UpdatePersonUseCase } from './update-person.use-case';
import { UpdatePersonDTO } from 'src/person/models/dtos/update-person.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Pessoa } from 'src/person/models/entity/person.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  UseGuards,
  Inject,
  Param,
  Patch,
  Body,
  Req,
} from '@nestjs/common';

@ApiTags('Pessoa')
@ApiBearerAuth('access-token')
@Controller('person')
@UseGuards(AuthGuard('jwt'))
export class UpdatePersonController {
  constructor(
    @Inject(UpdatePersonUseCase)
    private readonly personService: UpdatePersonUseCase,
  ) {}

  @ApiOperation({ summary: 'Modifica pessoa' })
  @ApiBody({ type: UpdatePersonDTO })
  @ApiOkResponse({ description: 'pessoa atualizada' })
  @ApiNotFoundResponse({ description: 'pessoa não encontrada.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() personDTO: UpdatePersonDTO,
    @Req() req: Request,
  ): Promise<Pessoa> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    return await this.personService.update(id, personDTO, req);
  }
}
