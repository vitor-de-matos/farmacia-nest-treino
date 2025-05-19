import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteMidiaUseCase } from 'src/media/use-case/delete-media/delete-media.use-case';
import { IProdutoRepo } from 'src/products/models/interface/produto-repo.interface';

@Injectable()
export class DeleteProdutoUseCase {
  constructor(
    @Inject('IProductRepo')
    private readonly productRepository: IProdutoRepo,
    @Inject(DeleteMidiaUseCase)
    private readonly mediaService: DeleteMidiaUseCase,
  ) {}

  async delete(id: number): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException({ message: 'Produto não encontrado' });
    }

    if (product.media.length) {
      for (const mediaItem of product.media) {
        await this.mediaService.delete(mediaItem.id);
      }
    }

    await this.productRepository.delete(id);
  }
}
