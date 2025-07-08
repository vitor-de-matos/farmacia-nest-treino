import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { FindAllSalesUseCase } from './find-all-sales.use-case';
import { FindSalesDTO } from 'src/sales/models/dtos/find-sales.dto';
import { Venda } from 'src/sales/models/entity/sales.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Vendas')
@ApiBearerAuth('access-token')
@Controller('sales')
@UseGuards(AuthGuard('jwt'))
export class FindAllSalesController {
  constructor(
    @Inject(FindAllSalesUseCase)
    private readonly salesService: FindAllSalesUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca varias vendas' })
  @ApiOkResponse({})
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() salesDTO: FindSalesDTO): Promise<{
    data: Venda[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.salesService.find(salesDTO);
  }
}
