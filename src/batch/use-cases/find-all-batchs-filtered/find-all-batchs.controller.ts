import { Controller, Get, Inject, Query } from '@nestjs/common';
import { FindAllBatchUseCase } from './find-all-batchs.use-case';
import { FindBatchDTO } from 'src/batch/models/dtos/find-lote.dto';
import { Lote } from 'src/batch/models/entity/batch.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Lote')
@ApiBearerAuth('access-token')
@Controller('batch')
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
