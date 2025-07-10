import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBatchDTO } from 'src/batch/models/dtos/create-batch.dto';
import { IBatchRepo } from 'src/batch/models/interface/batch-repo.interface';

@Injectable()
export class CreateBatchUseCase {
  constructor(
    @Inject('IBatchRepo')
    private readonly batchRepository: IBatchRepo,
  ) {}

  async create(batchDTO: CreateBatchDTO): Promise<number> {
    const batchCreated = await this.batchRepository.create(batchDTO);
    if (isNaN(batchCreated)) {
      throw new BadRequestException({
        message: 'Resposta invalida; entre em contato com o suporte',
      });
    }
    return batchCreated;
  }
}
