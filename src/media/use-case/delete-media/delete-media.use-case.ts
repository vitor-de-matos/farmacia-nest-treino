import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ArchivesManagementJob } from 'src/shared/job/images-vids/archives-management.job';
import { IMidiaRepo } from 'src/media/models/interface/midia-repo.interface';

@Injectable()
export class DeleteMidiaUseCase {
  constructor(
    @Inject('IMidiaRepo')
    private readonly mediaRepository: IMidiaRepo,
    @Inject(ArchivesManagementJob)
    private readonly archivesManagementJob: ArchivesManagementJob,
  ) {}

  async delete(id: number): Promise<void> {
    const media = await this.mediaRepository.findById(id);

    if (!media) {
      throw new NotFoundException({ message: 'Midia não encontrada' });
    }
    if (media.url && !media.url.includes('http')) {
      await this.archivesManagementJob.removeArchivesFromFileSystem(media.url);
    }

    await this.mediaRepository.delete(id);
  }
}
