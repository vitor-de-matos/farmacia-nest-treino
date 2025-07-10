import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { FindAllBatchUseCase } from './find-all-batchs.use-case';
import { FindBatchDTO } from 'src/batch/models/dtos/find-batch.dto';
import { Lote } from 'src/batch/models/entity/batch.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Lote')
@ApiBearerAuth('access-token')
@Controller('batch')
@UseGuards(AuthGuard('jwt'))
export class FindAllBatchController {
  constructor(
    @Inject(FindAllBatchUseCase)
    private readonly batchService: FindAllBatchUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca varios lotes' })
  @ApiOkResponse({})
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() batchDTO: FindBatchDTO): Promise<{
    data: Lote[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.batchService.find(batchDTO);
  }
}
