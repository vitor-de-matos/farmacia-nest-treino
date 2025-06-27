import { UpdateBatchUseCase } from './update-batch.use-case';
import { UpdateBatchDTO } from 'src/batch/models/dtos/update-lote.dto';
import { Lote } from 'src/batch/models/entity/batch.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  Inject,
  Param,
  Patch,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Lote')
@ApiBearerAuth('access-token')
@Controller('batch')
@UseGuards(AuthGuard('jwt'))
export class UpdateBatchController {
  constructor(
    @Inject(UpdateBatchUseCase)
    private readonly batchService: UpdateBatchUseCase,
  ) {}

  @ApiOperation({ summary: 'Modifica lote' })
  @ApiBody({ type: UpdateBatchDTO })
  @ApiOkResponse({ description: 'lote atualizado' })
  @ApiNotFoundResponse({ description: 'lote não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() batchDTO: UpdateBatchDTO,
  ): Promise<Lote> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    return await this.batchService.update(id, batchDTO);
  }
}
