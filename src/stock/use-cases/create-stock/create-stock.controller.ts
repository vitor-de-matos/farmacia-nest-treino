import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateStockUseCase } from './create-stock.use-case';
import { CreateStockDTO } from 'src/stock/models/dtos/create-stock.dto';

@ApiTags('Estoque')
@ApiBearerAuth('access-token')
@Controller('stock')
export class CreateBatchController {
  constructor(
    @Inject(CreateStockUseCase)
    private readonly stockService: CreateStockUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar estoque' })
  @ApiBody({ type: CreateStockDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(@Body() stockDTO: CreateStockDTO): Promise<number> {
    return await this.stockService.create(stockDTO);
  }
}
