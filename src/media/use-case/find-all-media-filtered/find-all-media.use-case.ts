import { ArchivesManagementJob } from 'src/shared/job/images-vids/archives-management.job';
import { Inject, Injectable } from '@nestjs/common';
import { FindMidiaDTO } from 'src/media/models/dtos/find-midia.dto';
import { IMidiaRepo } from 'src/media/models/interface/midia-repo.interface';
import { Midia } from 'src/media/models/entity/midia.entity';

@Injectable()
export class FindAllMidiaUseCase {
  constructor(
    @Inject('IMediaRepo')
    private readonly mediaRepository: IMidiaRepo,
    @Inject(ArchivesManagementJob)
    private readonly archivesManagementRepository: ArchivesManagementJob,
  ) {}

  async find(mediaDto: FindMidiaDTO): Promise<{
    data: Midia[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const media = await this.mediaRepository.find(mediaDto);

    const mediaWithUrls = await Promise.all(
      media.data.map(async (media) => {
        const completedUrl =
          await this.archivesManagementRepository.completeArchivePath(
            media.url,
          );
        return {
          ...media,
          url: completedUrl,
        };
      }),
    );

    return {
      ...media,
      data: mediaWithUrls,
    };
  }
}
