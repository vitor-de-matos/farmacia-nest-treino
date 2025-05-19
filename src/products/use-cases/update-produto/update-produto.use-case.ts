import { CreateMidiaUseCase } from 'src/media/use-case/create-media/create-media.use-case';
import { UpdateProdutoDTO } from 'src/products/models/dto/update-produto.dto';
import { CreateMidiaDTO } from 'src/media/models/dtos/create-midia.dto';
import { IProdutoRepo } from 'src/products/models/interface/produto-repo.interface';
import { Produto } from 'src/products/models/entity/product.entity';
import {
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class UpdateProdutoUseCase {
  constructor(
    @Inject('IProductRepo')
    private readonly productRepository: IProdutoRepo,
    @Inject(forwardRef(() => CreateMidiaUseCase))
    private readonly mediaRepository: CreateMidiaUseCase,
  ) {}

  async update(
    productId: number,
    productDTO: UpdateProdutoDTO,
    archives: Express.Multer.File[],
  ): Promise<Produto> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new NotFoundException({ message: 'Produto não encontrado' });
    }
    if (archives?.length) {
      await Promise.all(
        archives.map(async (file, index) => {
          const media: CreateMidiaDTO = {
            name: file.originalname,
            archive: file,
            icon:
              String(productDTO.icon?.[index]).toLocaleLowerCase() === 'true',
            productId: productId,
          };
          await this.mediaRepository.create(media);
        }),
      );
    }

    const updated = await this.productRepository.update(productId, productDTO);
    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar o produto no banco de dados',
      });
    }
    return updated;
  }
}
