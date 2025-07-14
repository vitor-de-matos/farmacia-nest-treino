import { FindProdutoUseCase } from './find-product.use-case';
import { AuthGuard } from '@nestjs/passport';
import { Produto } from 'src/products/models/entity/product.entity';
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

@ApiTags('Produto')
@ApiBearerAuth('access-token')
@Controller('product')
@UseGuards(AuthGuard('jwt'))
export class FindProdutoController {
  constructor(
    @Inject(FindProdutoUseCase)
    private readonly productService: FindProdutoUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar produto' })
  @ApiOkResponse({})
  @ApiNotFoundResponse({ description: 'Produto não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<Produto> {
    if (!id) {
      throw new NotAcceptableException({
        message: 'Requisição inválida; era esperado um ID numérico válido.',
      });
    }
    return await this.productService.find(id);
  }
}
