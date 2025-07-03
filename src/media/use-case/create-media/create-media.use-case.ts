import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ArchivesManagementJob } from 'src/shared/job/images-vids/archives-management.job';
import { CreateMidiaDTO } from 'src/media/models/dtos/create-midia.dto';
import { IProductRepo } from 'src/products/models/interface/produto-repo.interface';
import { IMidiaRepo } from 'src/media/models/interface/midia-repo.interface';

@Injectable()
export class CreateMidiaUseCase {
  constructor(
    @Inject('IMediaRepo')
    private readonly mediaRepository: IMidiaRepo,
    @Inject('IProductRepo')
    private readonly productRepository: IProductRepo,
    @Inject(ArchivesManagementJob)
    private readonly archivesManagementRepository: ArchivesManagementJob,
  ) {}

  async create(mediaDTO: CreateMidiaDTO): Promise<number> {
    const { archive, ...mediaToCreate } = mediaDTO;

    const idFields = ['productId'];
    const filledIdFields = idFields.filter(
      (field) =>
        mediaToCreate[field] !== undefined && mediaToCreate[field] !== null,
    );

    if (filledIdFields.length === 0) {
      throw new BadRequestException({
        message: `É necessário informar ao menos um dos seguintes campos: ${idFields.join(', ')}`,
      });
    }

    if (
      mediaToCreate.productId != null ||
      mediaToCreate.productId != undefined
    ) {
      const product = await this.productRepository.findById(
        mediaToCreate.productId,
      );
      if (product.media?.length && mediaDTO.icon) {
        throw new BadRequestException({
          message: 'Produto ja possui um icone',
        });
      }
    }

    const savedMedia = await this.mediaRepository.create(mediaToCreate);

    if (archive) {
      this.archivesManagementRepository.validateArchivesFile(archive);
      const fileName =
        await this.archivesManagementRepository.saveArchivesInFileSystem(
          savedMedia,
          mediaDTO.archive,
        );
      await this.mediaRepository.update(savedMedia, { url: fileName });
    }

    return savedMedia;
  }
}
