import { FindSalesUseCase } from './find-sales.use-case';
import { AuthGuard } from '@nestjs/passport';
import { Venda } from 'src/sales/models/entity/sales.entity';
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
  UseGuards,
  Inject,
  Param,
  Get,
} from '@nestjs/common';

@ApiTags('Vendas')
@ApiBearerAuth('access-token')
@Controller('sales')
@UseGuards(AuthGuard('jwt'))
export class FindsalesController {
  constructor(
    @Inject(FindSalesUseCase)
    private readonly salesService: FindSalesUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca venda por ID' })
  @ApiOkResponse({})
  @ApiNotFoundResponse({ description: 'Venda não encontrada.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<Venda> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida; era esperado um ID numérico válido.',
      });
    }
    return await this.salesService.find(id);
  }
}
