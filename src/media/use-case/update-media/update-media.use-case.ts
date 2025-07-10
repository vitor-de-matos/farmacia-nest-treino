import { ArchivesManagementJob } from 'src/shared/job/images-vids/archives-management.job';
import { UpdateMidiaDTO } from 'src/media/models/dtos/update-media.dto';
import { IProductRepo } from 'src/products/models/interface/product-repo.interface';
import { IMidiaRepo } from 'src/media/models/interface/midia-repo.interface';
import {
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class UpdateMidiaUseCase {
  constructor(
    @Inject('IMediaRepo')
    private readonly mediaRepository: IMidiaRepo,
    @Inject('IProductRepo')
    private readonly productRepository: IProductRepo,
    @Inject(ArchivesManagementJob)
    private readonly archivesManagementRepository: ArchivesManagementJob,
  ) {}

  async update(mediaId: number, mediaDTO: UpdateMidiaDTO): Promise<void> {
    const media = await this.mediaRepository.findById(mediaId);
    if (!media) {
      throw new NotFoundException({
        message: 'Midia não encontrada',
      });
    }

    const { archive, ...updateData } = mediaDTO;

    //const idFields = ['productId'];
    //const filledIdFields = idFields.filter(
    //  (field) => updateData[field] !== undefined && updateData[field] !== null,
    //);

    //if (filledIdFields.length > 1) {
    //  throw new BadRequestException({
    //    message: `Apenas um deve ser enviado: ${idFields.join(', ')}`,
    //  });
    //}

    // essa verificação impedirá que múltiplos relacionamentos sejam enviados ao mesmo tempo.

    if (
      updateData.productId != null ||
      updateData.productId != undefined ||
      media.product
    ) {
      const product = await this.productRepository.findById(media.product.id);
      if (product.media.find((media) => media.icon != false) && mediaDTO.icon) {
        throw new BadRequestException({ message: 'Produto ja possui icone' });
      }
    }

    if (archive) {
      await this.archivesManagementRepository.validateArchivesFile(archive);

      if (
        (mediaDTO.url != null || media.url != mediaDTO.url) &&
        !media.url.includes('http')
      ) {
        await this.archivesManagementRepository.removeArchivesFromFileSystem(
          media.url,
        );
      }

      const fileName =
        await this.archivesManagementRepository.saveArchivesInFileSystem(
          mediaId,
          archive,
        );

      updateData.url = fileName;
    } else {
      if (mediaDTO.url != null && !media.url.includes('http')) {
        await this.archivesManagementRepository.removeArchivesFromFileSystem(
          media.url,
        );
      }
    }

    if (!!String(mediaDTO.icon) && !mediaDTO.archive) {
      const updated = await this.mediaRepository.update(mediaId, {
        ...mediaDTO,
        icon: mediaDTO.icon,
      });
      if (!updated) {
        throw new InternalServerErrorException({
          message: 'Erro ao atualizar a mídia no banco de dados',
        });
      }
      return;
    }

    const updated = await this.mediaRepository.update(mediaId, updateData);

    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar a mídia no banco de dados',
      });
    }
  }
}
