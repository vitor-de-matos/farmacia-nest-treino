import { FindMidiaUseCase } from './find-media.use-case';
import { Midia } from 'src/media/models/entity/midia.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  Inject,
  Param,
  Get,
} from '@nestjs/common';

@ApiTags('Midia')
@ApiBearerAuth('access-token')
@Controller('media')
export class FindMidiaController {
  constructor(
    @Inject(FindMidiaUseCase)
    private readonly mediaService: FindMidiaUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca uma midia' })
  @ApiResponse({})
  @ApiNotFoundResponse({ description: 'Midia não encontrada.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<Midia> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    return await this.mediaService.find(id);
  }
}
