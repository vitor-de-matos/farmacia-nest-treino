import { Controller, Get, Inject, Query } from '@nestjs/common';
import { FindAllCategoryUseCase } from './find-all-categories.use-case';
import { FindCategoryDTO } from 'src/category/models/dtos/find-catetegory.dto';
import { Categoria } from 'src/category/models/entity/category.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Categoria')
@ApiBearerAuth('access-token')
@Controller('category')
export class FindAllCategoryController {
  constructor(
    @Inject(FindAllCategoryUseCase)
    private readonly categoryService: FindAllCategoryUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca varias categorias' })
  @ApiOkResponse({})
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() categoryDTO: FindCategoryDTO): Promise<{
    data: Categoria[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.categoryService.find(categoryDTO);
  }
}
