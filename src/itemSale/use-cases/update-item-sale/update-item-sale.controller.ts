import { UpdateItemSaleUseCase } from './update-item-sale.use-case';
import { UpdateItemSaleDTO } from 'src/itemSale/models/dtos/update-item-sale.dto';
import { ItemVenda } from 'src/itemSale/models/entity/item-sale.entity';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  UseGuards,
  Inject,
  Param,
  Patch,
  Body,
} from '@nestjs/common';

@ApiTags('Item Venda')
@ApiBearerAuth('access-token')
@Controller('itemSale')
@UseGuards(AuthGuard('jwt'))
export class UpdateItemSaleController {
  constructor(
    @Inject(UpdateItemSaleUseCase)
    private readonly updateItemSaleService: UpdateItemSaleUseCase,
  ) {}

  @ApiOperation({ summary: 'Modifica item da venda' })
  @ApiBody({ type: UpdateItemSaleDTO })
  @ApiOkResponse({ description: 'Item da venda atualizado' })
  @ApiNotFoundResponse({ description: 'Item da venda não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() itemSaleDTO: UpdateItemSaleDTO,
  ): Promise<ItemVenda> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    return await this.updateItemSaleService.update(id, itemSaleDTO);
  }
}
