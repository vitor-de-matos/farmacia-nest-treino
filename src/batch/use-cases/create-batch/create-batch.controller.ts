import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { CreateBatchUseCase } from './create-batch.use-case';
import { CreateBatchDTO } from 'src/batch/models/dtos/create-batch.dto';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@ApiTags('Lote')
@ApiBearerAuth('access-token')
@Controller('batch')
@UseGuards(AuthGuard('jwt'), AdminGuard)
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
