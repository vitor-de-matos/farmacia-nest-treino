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
import {
  NotAcceptableException,
  Controller,
  Inject,
  Post,
  Body,
} from '@nestjs/common';

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
    if (manufacturerDTO.cnpj.length != 14) {
      throw new NotAcceptableException({
        message: 'CNPJ não pode ter mais nem menos de 14 digitos',
      });
    }
    return await this.manufacturerService.create(manufacturerDTO);
  }
}
