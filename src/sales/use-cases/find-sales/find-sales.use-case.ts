import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ISalesRepo } from 'src/sales/models/interface/sales-repo.interface';
import { Venda } from 'src/sales/models/entity/sales.entity';

@Injectable()
export class FindSalesUseCase {
  constructor(
    @Inject('ISalesRepo')
    private readonly salesRepository: ISalesRepo,
  ) {}

  async find(salesId: number): Promise<Venda> {
    const sales = await this.salesRepository.findById(salesId);
    if (!sales) {
      throw new NotFoundException({
        message: 'Venda não encontrada',
      });
    }
    return sales;
  }
}
