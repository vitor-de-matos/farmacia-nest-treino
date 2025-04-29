import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateItemSaleUseCase } from './create-item-sale.use-case';
import { CreateItemSaleDTO } from 'src/itemSale/models/dtos/create-item-sale.dto';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Item Venda')
@ApiBearerAuth('access-token')
@Controller('itemSale')
export class CreateItemSaleController {
  constructor(
    @Inject(CreateItemSaleUseCase)
    private readonly itemSaleService: CreateItemSaleUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar item de venda' })
  @ApiBody({ type: CreateItemSaleDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(@Body() itemSaleDTO: CreateItemSaleDTO): Promise<number> {
    return await this.itemSaleService.create(itemSaleDTO);
  }
}
