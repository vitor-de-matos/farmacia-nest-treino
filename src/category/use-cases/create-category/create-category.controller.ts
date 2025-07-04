import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { CreateCategoryUseCase } from './create-category.use-case';
import { CreateCategoryDTO } from 'src/category/models/dtos/create-category.dto';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Categoria')
@ApiBearerAuth('access-token')
@Controller('category')
@UseGuards(AuthGuard('jwt'))
export class CreateCategoryController {
  constructor(
    @Inject(CreateCategoryUseCase)
    private readonly createCategoryService: CreateCategoryUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar categoria' })
  @ApiBody({ type: CreateCategoryDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(@Body() categoryDTO: CreateCategoryDTO): Promise<number> {
    return await this.createCategoryService.create(categoryDTO);
  }
}
