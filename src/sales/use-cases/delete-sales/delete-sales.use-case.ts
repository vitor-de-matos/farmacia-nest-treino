import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ISalesRepo } from 'src/sales/models/interface/sales-repo.interface';

@Injectable()
export class DeleteSalesUseCase {
  constructor(
    @Inject('ISalesRepo')
    private readonly salesRepository: ISalesRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const sales = await this.salesRepository.findById(id);

    if (!sales) {
      throw new NotFoundException({
        message: 'Venda não encontrada',
      });
    }

    await this.salesRepository.delete(id);
  }
}
