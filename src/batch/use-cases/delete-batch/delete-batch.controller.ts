import { DeleteBatchUseCase } from './delete-batch.use-case';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  Delete,
  Inject,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Lote')
@ApiBearerAuth('access-token')
@Controller('batch')
@UseGuards(AuthGuard('jwt'))
export class DeleteBatchController {
  constructor(
    @Inject(DeleteBatchUseCase)
    private readonly batchService: DeleteBatchUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir um lote' })
  @ApiOkResponse({ description: 'Lote removido com sucesso' })
  @ApiNotFoundResponse({ description: 'Lote não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    await this.batchService.delete(id);
    return 'Lote removido com sucesso';
  }
}
