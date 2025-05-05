import { UpdateSalesDTO } from 'src/sales/models/dtos/update-sales.dto';
import { ISalesRepo } from 'src/sales/models/interface/sales-repo.interface';
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class UpdateSalesUseCase {
  constructor(
    @Inject('ISalesRepo')
    private readonly salesRepository: ISalesRepo,
  ) {}

  async update(salesId: number, salesDTO: UpdateSalesDTO) {
    const sales = await this.salesRepository.findById(salesId);
    if (!sales) {
      throw new NotFoundException({
        message: 'Venda não encontrada',
      });
    }

    const updated = await this.salesRepository.update(salesId, salesDTO);

    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar a venda entre em contato com o suporte',
      });
    }

    return updated;
  }
}
