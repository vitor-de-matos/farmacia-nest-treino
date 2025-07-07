import { Controller, Get, Inject, Query } from '@nestjs/common';
import { FindAllProdutosUseCase } from './find-all-product.use-case';
import { FindProdutoDTO } from 'src/products/models/dto/find-produto.dto';
import { Produto } from 'src/products/models/entity/product.entity';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Produto')
@ApiBearerAuth('access-token')
@Controller('product')
export class FindAllProdutoController {
  constructor(
    @Inject(FindAllProdutosUseCase)
    private readonly productService: FindAllProdutosUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar produto' })
  @ApiOkResponse({})
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() productDTO: FindProdutoDTO): Promise<{
    data: Produto[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.productService.find(productDTO);
  }
}
