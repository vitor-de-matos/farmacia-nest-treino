import { DeleteManufacturerUseCase } from './delete-manufacturer.use-case';
import { AuthGuard } from '@nestjs/passport';
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
  UseGuards,
  Delete,
  Inject,
  Param,
} from '@nestjs/common';

@ApiTags('Fabricante')
@ApiBearerAuth('access-token')
@Controller('manufacturer')
@UseGuards(AuthGuard('jwt'))
export class DeleteManufacturerController {
  constructor(
    @Inject(DeleteManufacturerUseCase)
    private readonly manufacturerService: DeleteManufacturerUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir um fabricante' })
  @ApiOkResponse({ description: 'Fabricante removido com sucesso' })
  @ApiNotFoundResponse({ description: 'Fabricante não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    await this.manufacturerService.delete(id);
    return 'Fabricante removido com sucesso';
  }
}
