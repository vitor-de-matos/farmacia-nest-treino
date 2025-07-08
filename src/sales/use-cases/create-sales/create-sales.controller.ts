import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { CreateSalesUseCase } from './create-sales.use-case';
import { CreateSalesDTO } from 'src/sales/models/dtos/create-sales.dto';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Vendas')
@ApiBearerAuth('access-token')
@Controller('sales')
@UseGuards(AuthGuard('jwt'))
export class CreateSalesController {
  constructor(
    @Inject(CreateSalesUseCase)
    private readonly salesService: CreateSalesUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar venda' })
  @ApiBody({ type: CreateSalesDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(@Body() salesDTO: CreateSalesDTO): Promise<number> {
    return await this.salesService.create(salesDTO);
  }
}
