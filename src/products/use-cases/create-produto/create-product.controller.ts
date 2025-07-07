import { ArchivesManagementJob } from 'src/shared/job/images-vids/archives-management.job';
import { CreateProdutoUseCase } from './create-product.use-case';
import { CreateProdutoDTO } from 'src/products/models/dto/create-produto.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
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
  UploadedFiles,
  Controller,
  Inject,
  Body,
  Post,
} from '@nestjs/common';

@ApiTags('Produto')
@ApiBearerAuth('access-token')
@Controller('product')
export class CreateProdutoController {
  constructor(
    @Inject(CreateProdutoUseCase)
    private readonly productService: CreateProdutoUseCase,
    @Inject(ArchivesManagementJob)
    private readonly archiveManagementService: ArchivesManagementJob,
  ) {}

  @ApiOperation({ summary: 'Adicionar produto' })
  @ApiBody({ type: CreateProdutoDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  @UseInterceptors(FilesInterceptor('archives', 10))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() productDTO: CreateProdutoDTO,
    @UploadedFiles() archives: Express.Multer.File[],
  ): Promise<number> {
    if (archives?.length) {
      archives.forEach((file) =>
        this.archiveManagementService.validateArchivesFile(file),
      );
    } else {
      throw new BadRequestException({
        message: 'Arquivo deve ser enviado',
      });
    }
    return await this.productService.create(productDTO, archives);
  }
}
