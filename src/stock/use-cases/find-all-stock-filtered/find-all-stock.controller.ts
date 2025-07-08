import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { FindAllStockUseCase } from './find-all-stock.use-case';
import { FindStockDTO } from 'src/stock/models/dtos/find-stock.dto';
import { Estoque } from 'src/stock/models/entity/stock.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Estoque')
@ApiBearerAuth('access-token')
@Controller('stock')
@UseGuards(AuthGuard('jwt'))
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
