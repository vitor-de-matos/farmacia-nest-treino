import { ArchivesManagementJob } from 'src/shared/job/images-vids/archives-management.job';
import { UpdateProdutoUseCase } from './update-produto.use-case';
import { UpdateProdutoDTO } from 'src/products/models/dto/update-produto.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Produto } from 'src/products/models/entity/product.entity';
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
  UploadedFiles,
  Controller,
  Inject,
  Param,
  Patch,
  Body,
} from '@nestjs/common';

@ApiTags('Produto')
@ApiBearerAuth('access-token')
@Controller('product')
export class UpdateProdutoController {
  constructor(
    @Inject(UpdateProdutoUseCase)
    private readonly productService: UpdateProdutoUseCase,
    @Inject(ArchivesManagementJob)
    private readonly archiveManagementService: ArchivesManagementJob,
  ) {}

  @ApiOperation({ summary: 'Modificar produto' })
  @ApiBody({ type: UpdateProdutoDTO })
  @ApiOkResponse({ description: 'Produto atualizado' })
  @ApiNotFoundResponse({
    description: 'Produto não encontrado.',
  })
  @ApiNotAcceptableResponse({
    description: 'Id inválido.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('archives', 10))
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: number,
    @Body() productDTO: UpdateProdutoDTO,
    @UploadedFiles() archives: Express.Multer.File[],
  ): Promise<Produto> {
    if (!id) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    if (archives?.length) {
      archives.forEach((file) =>
        this.archiveManagementService.validateArchivesFile(file),
      );
    }
    const updatedProduct = await this.productService.update(
      id,
      productDTO,
      archives,
    );
    return updatedProduct;
  }
}
