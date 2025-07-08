import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { FindAllItemSaleUseCase } from './find-all-item-sale.use-case';
import { FindItemSaleDTO } from 'src/itemSale/models/dtos/find-item-sale.dto';
import { ItemVenda } from 'src/itemSale/models/entity/item-sale.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Item Venda')
@ApiBearerAuth('access-token')
@Controller('itemSale')
@UseGuards(AuthGuard('jwt'))
export class FindAllItemSaleController {
  constructor(
    @Inject(FindAllItemSaleUseCase)
    private readonly itemSaleService: FindAllItemSaleUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca varios item de venda' })
  @ApiOkResponse({})
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() itemSaleDTO: FindItemSaleDTO): Promise<{
    data: ItemVenda[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.itemSaleService.find(itemSaleDTO);
  }
}
