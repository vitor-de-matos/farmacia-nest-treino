import { Controller, Get, Inject, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindAllStockUseCase } from './find-all-stock.use-case';
import { FindStockDTO } from 'src/stock/models/dtos/find-stock.dto';
import { Estoque } from 'src/stock/models/entity/stock.entity';

@ApiTags('Estoque')
@ApiBearerAuth('access-token')
@Controller('stock')
export class FindAllStockController {
  constructor(
    @Inject(FindAllStockUseCase)
    private readonly stockService: FindAllStockUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca varios estoques' })
  @ApiOkResponse({})
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() stockDTO: FindStockDTO): Promise<{
    data: Estoque[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.stockService.find(stockDTO);
  }
}
