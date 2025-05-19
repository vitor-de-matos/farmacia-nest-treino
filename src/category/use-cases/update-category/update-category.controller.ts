import { UpdateCategoryUseCase } from './update-category.use-case';
import { UpdateCategoryDTO } from 'src/category/models/dtos/update-category.dto';
import { Categoria } from 'src/category/models/entity/category.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  Inject,
  Param,
  Patch,
  Body,
} from '@nestjs/common';

@ApiTags('Categoria')
@ApiBearerAuth('access-token')
@Controller('category')
export class UpdateCategoryController {
  constructor(
    @Inject(UpdateCategoryUseCase)
    private readonly updateCategoryService: UpdateCategoryUseCase,
  ) {}

  @ApiOperation({ summary: 'Modifica categoria' })
  @ApiBody({ type: UpdateCategoryDTO })
  @ApiOkResponse({ description: 'Categoria atualizada' })
  @ApiNotFoundResponse({ description: 'Categoria não encontrada.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() categoryDTO: UpdateCategoryDTO,
  ): Promise<Categoria> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    return await this.updateCategoryService.update(id, categoryDTO);
  }
}
