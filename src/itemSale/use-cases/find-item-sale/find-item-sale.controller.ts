import { FindItemSaleUseCase } from './find-item-sale.use-case';
import { ItemVenda } from 'src/itemSale/models/entity/item-sale.entity';
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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Item Venda')
@ApiBearerAuth('access-token')
@Controller('itemSale')
@UseGuards(AuthGuard('jwt'))
export class FindItemSaleController {
  constructor(
    @Inject(FindItemSaleUseCase)
    private readonly itemSaleService: FindItemSaleUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca item de venda por ID' })
  @ApiOkResponse({})
  @ApiNotFoundResponse({ description: 'Item de venda não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<ItemVenda> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida; era esperado um ID numérico válido.',
      });
    }
    return await this.itemSaleService.find(id);
  }
}
