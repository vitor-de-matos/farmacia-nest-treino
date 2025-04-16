import { ArchivesManagementJob } from 'src/shared/job/images-vids/archives-management.job';
import { Inject, Injectable } from '@nestjs/common';
import { FindProdutoDTO } from 'src/products/models/dto/find-produto.dto';
import { IProdutoRepo } from 'src/products/models/interface/produto-repo.interface';
import { Produto } from 'src/products/models/entity/product.entity';

@Injectable()
export class FindAllProdutosUseCase {
  constructor(
    @Inject('IProdutoRepo')
    private readonly productRepository: IProdutoRepo,
    @Inject(ArchivesManagementJob)
    private readonly archivesService: ArchivesManagementJob,
  ) {}

  async find(productDTO: FindProdutoDTO): Promise<{
    data: Produto[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const product = await this.productRepository.find(productDTO);
    for (const productItem of product.data) {
      if (productItem.media && productItem.media.length > 0) {
        for (const mediaItem of productItem.media) {
          mediaItem.url = await this.archivesService.completeArchivePath(
            mediaItem.url,
          );
        }
      }
    }
    return product;
  }
}
