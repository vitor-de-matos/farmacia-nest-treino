import { FindStockUseCase } from './find-stock.use-case';
import { AuthGuard } from '@nestjs/passport';
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
  UseGuards,
  Inject,
  Param,
  Get,
} from '@nestjs/common';

@ApiTags('Estoque')
@ApiBearerAuth('access-token')
@Controller('stock')
@UseGuards(AuthGuard('jwt'))
export class FindStockController {
  constructor(
    @Inject(FindStockUseCase)
    private readonly stockService: FindStockUseCase,
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
    return await this.stockService.find(id);
  }
}
