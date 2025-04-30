import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateManufacturerUseCase } from './create-manufacturer.use-case';
import { CreateManufacturerDTO } from 'src/manufacturer/models/dtos/create-manufacturer.dto';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Fabricante')
@ApiBearerAuth('access-token')
@Controller('manufacturer')
export class CreateManufacturerController {
  constructor(
    @Inject(CreateManufacturerUseCase)
    private readonly manufacturerService: CreateManufacturerUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar fabricante' })
  @ApiBody({ type: CreateManufacturerDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(
    @Body() manufacturerDTO: CreateManufacturerDTO,
  ): Promise<number> {
    return await this.manufacturerService.create(manufacturerDTO);
  }
}
