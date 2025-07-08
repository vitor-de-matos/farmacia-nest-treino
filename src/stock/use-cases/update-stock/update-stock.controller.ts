import { UpdateStockUseCase } from './update-stock.use-case';
import { UpdateStockDTO } from 'src/stock/models/dtos/update-stock.dto';
import { Estoque } from 'src/stock/models/entity/stock.entity';
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
  Inject,
  Param,
  Patch,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Estoque')
@ApiBearerAuth('access-token')
@Controller('stock')
@UseGuards(AuthGuard('jwt'))
export class UpdateStockController {
  constructor(
    @Inject(UpdateStockUseCase)
    private readonly StockService: UpdateStockUseCase,
  ) {}

  @ApiOperation({ summary: 'Modifica Estoque' })
  @ApiBody({ type: UpdateStockDTO })
  @ApiOkResponse({ description: 'Estoque atualizado' })
  @ApiNotFoundResponse({ description: 'Estoque não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() batchDTO: UpdateStockDTO,
  ): Promise<Estoque> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    return await this.StockService.update(id, batchDTO);
  }
}
