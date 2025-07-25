import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ArchivesManagementJob } from 'src/shared/job/images-vids/archives-management.job';
import { IProductRepo } from 'src/products/models/interface/product-repo.interface';
import { Produto } from 'src/products/models/entity/product.entity';

@Injectable()
export class FindProdutoUseCase {
  constructor(
    @Inject('IProductRepo')
    private readonly productRepository: IProductRepo,
    @Inject(ArchivesManagementJob)
    private readonly archivesService: ArchivesManagementJob,
  ) {}

  async find(productId: number): Promise<Produto> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new NotFoundException({ message: 'Produto não encontrado' });
    }

    for (const mediaItem of product.media) {
      mediaItem.url = await this.archivesService.completeArchivePath(
        mediaItem.url,
      );
    }
    return product;
  }
}
