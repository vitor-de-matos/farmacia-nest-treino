import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { FindAllMidiaUseCase } from './find-all-media.use-case';
import { FindMidiaDTO } from 'src/media/models/dtos/find-media.dto';
import { AuthGuard } from '@nestjs/passport';
import { Midia } from 'src/media/models/entity/midia.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Midia')
@ApiBearerAuth('access-token')
@Controller('media')
@UseGuards(AuthGuard('jwt'))
export class FindAllMidiaController {
  constructor(
    @Inject(FindAllMidiaUseCase)
    private readonly mediaService: FindAllMidiaUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca varias midia' })
  @ApiResponse({})
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() mediaDTO: FindMidiaDTO): Promise<{
    data: Midia[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.mediaService.find(mediaDTO);
  }
}
