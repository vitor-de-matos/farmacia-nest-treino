import { ArchivesManagementJob } from 'src/shared/job/images-vids/archives-management.job';
import { CreateProdutoUseCase } from './create-product.use-case';
import { CreateProductDTO } from 'src/products/models/dto/create-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import {
  BadRequestException,
  UseInterceptors,
  UploadedFiles,
  Controller,
  UseGuards,
  Inject,
  Body,
  Post,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Produto')
@ApiBearerAuth('access-token')
@Controller('product')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class CreateProdutoController {
  constructor(
    @Inject(CreateProdutoUseCase)
    private readonly productService: CreateProdutoUseCase,
    @Inject(ArchivesManagementJob)
    private readonly archiveManagementService: ArchivesManagementJob,
  ) {}

  @ApiOperation({ summary: 'Adicionar produto' })
  @ApiBody({ type: CreateProductDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  @UseInterceptors(FilesInterceptor('archives', 10))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() productDTO: CreateProductDTO,
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
