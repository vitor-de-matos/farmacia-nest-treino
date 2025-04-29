import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IBatchRepo } from 'src/batch/models/interface/lote-repo.interface';
import { Lote } from 'src/batch/models/entity/batch.entity';

@Injectable()
export class FindBatchUseCase {
  constructor(
    @Inject('IBatchRepo')
    private readonly batchRepository: IBatchRepo,
  ) {}

  async find(batchId: number): Promise<Lote> {
    const batch = await this.batchRepository.findById(batchId);
    if (!batch) {
      throw new NotFoundException({
        message: 'Lote não encontrado',
      });
    }
    return batch;
  }
}
