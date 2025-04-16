import { UpdateMidiaUseCase } from './update-media.use-case';
import { UpdateMidiaDTO } from 'src/media/models/dtos/update-midia.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  UseInterceptors,
  UploadedFile,
  Controller,
  Inject,
  Param,
  Patch,
  Body,
} from '@nestjs/common';

@ApiTags('Midia')
@ApiBearerAuth('access-token')
@Controller('media')
export class UpdateMidiaController {
  constructor(
    @Inject(UpdateMidiaUseCase)
    private readonly updateMediaService: UpdateMidiaUseCase,
  ) {}

  @ApiOperation({ summary: 'Modifica midia' })
  @ApiBody({ type: UpdateMidiaDTO })
  @ApiOkResponse({ description: 'Midia atualizada' })
  @ApiNotFoundResponse({ description: 'Midia não encontrada.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('archive'))
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: number,
    @Body() mediaDto: UpdateMidiaDTO,
    @UploadedFile() archive: Express.Multer.File,
  ): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    if (archive) {
      mediaDto.archive = archive;
    }
    await this.updateMediaService.update(id, mediaDto);
    return 'Midia atualizada';
  }
}
