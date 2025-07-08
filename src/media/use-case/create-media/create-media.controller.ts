import { ArchivesManagementJob } from 'src/shared/job/images-vids/archives-management.job';
import { CreateMidiaUseCase } from './create-media.use-case';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMidiaDTO } from 'src/media/models/dtos/create-midia.dto';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import {
  BadRequestException,
  UseInterceptors,
  UploadedFile,
  Controller,
  Inject,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Midia')
@ApiBearerAuth('access-token')
@Controller('media')
@UseGuards(AuthGuard('jwt'))
export class CreateMidiaController {
  constructor(
    @Inject(CreateMidiaUseCase)
    private readonly createMediaService: CreateMidiaUseCase,
    @Inject(ArchivesManagementJob)
    private readonly archiveManagementService: ArchivesManagementJob,
  ) {}

  @ApiOperation({ summary: 'Adicionar uma midia' })
  @ApiBody({ type: CreateMidiaDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  @UseInterceptors(FileInterceptor('archive'))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() mediaDTO: CreateMidiaDTO,
    @UploadedFile() archive: Express.Multer.File,
  ): Promise<number> {
    if (archive) {
      this.archiveManagementService.validateArchivesFile(archive);
      mediaDTO.archive = archive;
    }
    if (!archive && !mediaDTO.url) {
      throw new BadRequestException({
        message: 'Arquivo ou URL deve ser enviado',
      });
    }

    return await this.createMediaService.create(mediaDTO);
  }
}
