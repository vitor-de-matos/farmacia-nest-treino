import { GenerateInvoiceUseCase } from './generate-invoice.use-case';
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
  Inject,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Vendas')
@ApiBearerAuth('access-token')
@Controller('generate-invoice')
@UseGuards(AuthGuard('jwt'))
export class GenerateInvoiceController {
  constructor(
    @Inject(GenerateInvoiceUseCase)
    private readonly salesService: GenerateInvoiceUseCase,
  ) {}

  @ApiOperation({ summary: 'Cria nota fiscal' })
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
