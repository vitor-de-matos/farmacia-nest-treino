import { FindCategoryUseCase } from './find-category.use-case';
import { Categoria } from 'src/category/models/entity/category.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  Inject,
  Param,
  Get,
} from '@nestjs/common';

@ApiTags('Categoria')
@ApiBearerAuth('access-token')
@Controller('category')
export class FindCategoryController {
  constructor(
    @Inject(FindCategoryUseCase)
    private readonly categoryService: FindCategoryUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca categoria por ID' })
  @ApiOkResponse({})
  @ApiNotFoundResponse({ description: 'Categoria não encontrada.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<Categoria> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida; era esperado um ID numérico válido.',
      });
    }
    return await this.categoryService.find(id);
  }
}
