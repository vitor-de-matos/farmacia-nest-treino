import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateBatchUseCase } from './create-batch.use-case';
import { CreateBatchDTO } from 'src/batch/models/dtos/create-lote.dto';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Lote')
@ApiBearerAuth('access-token')
@Controller('batch')
export class CreateBatchController {
  constructor(
    @Inject(CreateBatchUseCase)
    private readonly batchService: CreateBatchUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar lote' })
  @ApiBody({ type: CreateBatchDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(@Body() batchDTO: CreateBatchDTO): Promise<number> {
    return await this.batchService.create(batchDTO);
  }
}
