import { UpdateManufacturerUseCase } from './update-manufacturer.use-case';
import { UpdateManufacturerDTO } from 'src/manufacturer/models/dtos/update-manufacturer.dto';
import { Fabricante } from 'src/manufacturer/models/entity/manufacturer.entity';
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

@ApiTags('Fabricante')
@ApiBearerAuth('access-token')
@Controller('manufacturer')
@UseGuards(AuthGuard('jwt'))
export class UpdateManufacturerController {
  constructor(
    @Inject(UpdateManufacturerUseCase)
    private readonly updateBatchService: UpdateManufacturerUseCase,
  ) {}

  @ApiOperation({ summary: 'Modifica fabricante' })
  @ApiBody({ type: UpdateManufacturerDTO })
  @ApiOkResponse({ description: 'Fabricante atualizado' })
  @ApiNotFoundResponse({ description: 'Fabricante não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() manufacturerDTO: UpdateManufacturerDTO,
  ): Promise<Fabricante> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    return await this.updateBatchService.update(id, manufacturerDTO);
  }
}
