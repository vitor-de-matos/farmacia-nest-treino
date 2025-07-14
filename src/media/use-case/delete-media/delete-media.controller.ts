import { DeleteMidiaUseCase } from './delete-media.use-case';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  UseGuards,
  Delete,
  Inject,
  Param,
} from '@nestjs/common';

@ApiTags('Midia')
@ApiBearerAuth('access-token')
@Controller('media')
@UseGuards(AuthGuard('jwt'))
export class DeleteMidiaController {
  constructor(
    @Inject(DeleteMidiaUseCase)
    private readonly mediaService: DeleteMidiaUseCase,
  ) {}

  @ApiOperation({ summary: 'Exclui uma midia' })
  @ApiOkResponse({ description: 'Midia removida com sucesso' })
  @ApiNotFoundResponse({ description: 'Midia não encontrada.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    await this.mediaService.delete(id);
    return 'Midia removida com sucesso';
  }
}
