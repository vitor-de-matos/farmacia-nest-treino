import { FindManufacturerUseCase } from './find-manufacturer.use-case';
import { Fabricante } from 'src/manufacturer/models/entity/manufacturer.entity';
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

@ApiTags('Fabricante')
@ApiBearerAuth('access-token')
@Controller('manufacturer')
export class FindManufacturerController {
  constructor(
    @Inject(FindManufacturerUseCase)
    private readonly manufactureService: FindManufacturerUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca fabricante por ID' })
  @ApiOkResponse({})
  @ApiNotFoundResponse({ description: 'Fabricante não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<Fabricante> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida; era esperado um ID numérico válido.',
      });
    }
    return await this.manufactureService.find(id);
  }
}
