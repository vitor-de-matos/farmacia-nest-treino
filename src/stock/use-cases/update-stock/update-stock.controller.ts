import {
  Body,
  Controller,
  Inject,
  NotAcceptableException,
  Param,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateStockUseCase } from './update-stock.use-case';
import { UpdateStockDTO } from 'src/stock/models/dtos/update-stock.dto';
import { Estoque } from 'src/stock/models/entity/stock.entity';

@ApiTags('Lote')
@ApiBearerAuth('access-token')
@Controller('batch')
export class UpdateBatchController {
  constructor(
    @Inject(UpdateStockUseCase)
    private readonly batchService: UpdateStockUseCase,
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
    return await this.batchService.update(id, batchDTO);
  }
}
