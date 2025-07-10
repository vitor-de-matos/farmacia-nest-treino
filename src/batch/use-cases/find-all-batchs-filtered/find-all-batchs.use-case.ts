import { Inject, Injectable } from '@nestjs/common';
import { FindBatchDTO } from 'src/batch/models/dtos/find-batch.dto';
import { IBatchRepo } from 'src/batch/models/interface/batch-repo.interface';
import { Lote } from 'src/batch/models/entity/batch.entity';

@Injectable()
export class FindAllBatchUseCase {
  constructor(
    @Inject('IBatchRepo')
    private readonly batchRepository: IBatchRepo,
  ) {}

  async find(batchDTO: FindBatchDTO): Promise<{
    data: Lote[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.batchRepository.find(batchDTO);
  }
}
