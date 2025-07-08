import { UpdateSalesUseCase } from './update-sales.use-case';
import { UpdateSalesDTO } from 'src/sales/models/dtos/update-sales.dto';
import { Venda } from 'src/sales/models/entity/sales.entity';
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

@ApiTags('Vendas')
@ApiBearerAuth('access-token')
@Controller('sales')
@UseGuards(AuthGuard('jwt'))
export class UpdateSalesController {
  constructor(
    @Inject(UpdateSalesUseCase)
    private readonly salesService: UpdateSalesUseCase,
  ) {}

  @ApiOperation({ summary: 'Modifica venda' })
  @ApiBody({ type: UpdateSalesDTO })
  @ApiOkResponse({ description: 'Venda atualizada' })
  @ApiNotFoundResponse({ description: 'Venda não encontrada.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() salesDTO: UpdateSalesDTO,
  ): Promise<Venda> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    return await this.salesService.update(id, salesDTO);
  }
}
