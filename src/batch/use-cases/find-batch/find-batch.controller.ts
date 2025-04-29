import { FindBatchUseCase } from './find-batch.use-case';
import { Lote } from 'src/batch/models/entity/batch.entity';
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

@ApiTags('Lote')
@ApiBearerAuth('access-token')
@Controller('batch')
export class FindBatchController {
  constructor(
    @Inject(FindBatchUseCase)
    private readonly batchService: FindBatchUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca lote por ID' })
  @ApiOkResponse({})
  @ApiNotFoundResponse({ description: 'Lote não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<Lote> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida; era esperado um ID numérico válido.',
      });
    }
    return await this.batchService.find(id);
  }
}
