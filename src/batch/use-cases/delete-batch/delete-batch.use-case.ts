import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IBatchRepo } from 'src/batch/models/interface/batch-repo.interface';

@Injectable()
export class DeleteBatchUseCase {
  constructor(
    @Inject('IBatchRepo')
    private readonly batchRepository: IBatchRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const batch = await this.batchRepository.findById(id);

    if (!batch) {
      throw new NotFoundException({
        message: 'Lote não encontrado',
      });
    }

    await this.batchRepository.delete(id);
  }
}
