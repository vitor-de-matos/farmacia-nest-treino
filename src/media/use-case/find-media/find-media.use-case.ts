import { ArchivesManagementJob } from 'src/shared/job/images-vids/archives-management.job';
import { IMidiaRepo } from 'src/media/models/interface/midia-repo.interface';
import { Midia } from 'src/media/models/entity/midia.entity';
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class FindMidiaUseCase {
  constructor(
    @Inject('IMidiaRepo')
    private readonly mediaRepository: IMidiaRepo,
    @Inject(ArchivesManagementJob)
    private readonly archivesManagementRepository: ArchivesManagementJob,
  ) {}

  async find(mediaId: number): Promise<Midia> {
    const media = await this.mediaRepository.findById(mediaId);
    if (!media) {
      throw new NotFoundException({ message: 'Mídia não encontrada' });
    }

    if (media.url.includes('http')) {
      return media;
    } else {
      const link = await this.archivesManagementRepository.completeArchivePath(
        media.url,
      );
      if (!link) {
        throw new InternalServerErrorException({
          message: 'Erro ao gerar o caminho do arquivo',
        });
      }
      media.url = link;
      return media;
    }
  }
}
