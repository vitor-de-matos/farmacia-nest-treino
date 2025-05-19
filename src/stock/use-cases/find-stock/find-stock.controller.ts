import { FindStockUseCase } from './find-stock.use-case';
import { Estoque } from 'src/stock/models/entity/stock.entity';
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
  Inject,
  Param,
  Get,
} from '@nestjs/common';

@ApiTags('Estoque')
@ApiBearerAuth('access-token')
@Controller('stock')
export class FindStockController {
  constructor(
    @Inject(FindStockUseCase)
    private readonly batchService: FindStockUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca estoque por ID' })
  @ApiOkResponse({})
  @ApiNotFoundResponse({ description: 'Estoque não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<Estoque> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida; era esperado um ID numérico válido.',
      });
    }
    return await this.batchService.find(id);
  }
}
