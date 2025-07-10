import { UpdateBatchDTO } from 'src/batch/models/dtos/update-batch.dto';
import { IBatchRepo } from 'src/batch/models/interface/batch-repo.interface';
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class UpdateBatchUseCase {
  constructor(
    @Inject('IBatchRepo')
    private readonly batchRepository: IBatchRepo,
  ) {}

  async update(batchId: number, batchDTO: UpdateBatchDTO) {
    const batch = await this.batchRepository.findById(batchId);
    if (!batch) {
      throw new NotFoundException({
        message: 'Lote não encontrado',
      });
    }

    const updated = await this.batchRepository.update(batchId, batchDTO);

    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar entre em contato com o suporte',
      });
    }

    return updated;
  }
}
