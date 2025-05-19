import { CreateMidiaUseCase } from 'src/media/use-case/create-media/create-media.use-case';
import { CreateProdutoDTO } from 'src/products/models/dto/create-produto.dto';
import { CreateMidiaDTO } from 'src/media/models/dtos/create-midia.dto';
import { IProdutoRepo } from 'src/products/models/interface/produto-repo.interface';
import {
  BadRequestException,
  forwardRef,
  Injectable,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { ICategoryRepo } from 'src/category/models/interface/category-repo.interface';
import { IManufacturerRepo } from 'src/manufacturer/models/interface/manufacturer-repo.interface';

@Injectable()
export class CreateProdutoUseCase {
  constructor(
    @Inject('IProductRepo')
    private readonly produtoRepository: IProdutoRepo,
    @Inject('ICategoryRepo')
    private readonly categoryRepository: ICategoryRepo,
    @Inject('IManufacturerRepo')
    private readonly manufacturerRepository: IManufacturerRepo,
    @Inject(forwardRef(() => CreateMidiaUseCase))
    private readonly midiaRepository: CreateMidiaUseCase,
  ) {}

  async create(
    produtoDTO: CreateProdutoDTO,
    archives: Express.Multer.File[],
  ): Promise<number> {
    const category = await this.categoryRepository.findById(
      produtoDTO.categoryId,
    );
    if (!category) {
      throw new NotFoundException({ message: 'categoria não encontrada' });
    }

    const manufacturer = await this.manufacturerRepository.findById(
      produtoDTO.manufacturerId,
    );
    if (!manufacturer) {
      throw new NotFoundException({ message: 'fabricante não encontrado' });
    }

    const productCreated = await this.produtoRepository.create(produtoDTO);
    if (archives?.length) {
      await Promise.all(
        archives.map(async (file, index) => {
          const media: CreateMidiaDTO = {
            name: file.originalname,
            archive: file,
            icon:
              String(produtoDTO.icon?.[index]).toLocaleLowerCase() === 'true',
            productId: productCreated,
          };
          await this.midiaRepository.create(media);
        }),
      );
    }
    if (!productCreated) {
      throw new BadRequestException({
        message: `Erro na criação do produto ${produtoDTO.name} entre em contato com o suporte`,
      });
    }
    return productCreated;
  }
}
