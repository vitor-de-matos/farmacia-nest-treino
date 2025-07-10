import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { FindAllProdutosUseCase } from './find-all-product.use-case';
import { FindProductDTO } from 'src/products/models/dto/find-product.dto';
import { Produto } from 'src/products/models/entity/product.entity';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Produto')
@ApiBearerAuth('access-token')
@Controller('product')
@UseGuards(AuthGuard('jwt'))
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
  async find(@Query() productDTO: FindProductDTO): Promise<{
    data: Produto[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.productService.find(productDTO);
  }
}
