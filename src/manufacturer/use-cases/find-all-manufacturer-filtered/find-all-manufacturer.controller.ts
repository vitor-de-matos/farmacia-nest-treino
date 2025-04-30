import { Controller, Get, Inject, Query } from '@nestjs/common';
import { FindAllManufacturerUseCase } from './find-all-manufacturer.use-case';
import { FindManufacturerDTO } from 'src/manufacturer/models/dtos/find-manufacturer.dto';
import { Fabricante } from 'src/manufacturer/models/entity/manufacturer.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Fabricante')
@ApiBearerAuth('access-token')
@Controller('manufacturer')
export class FindAllManufacturerController {
  constructor(
    @Inject(FindAllManufacturerUseCase)
    private readonly manufacturerService: FindAllManufacturerUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca varios Fabricantes' })
  @ApiOkResponse({})
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() manufacturerDTO: FindManufacturerDTO): Promise<{
    data: Fabricante[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.manufacturerService.find(manufacturerDTO);
  }
}
