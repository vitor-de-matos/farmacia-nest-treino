import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IStockRepo } from 'src/stock/models/interface/stock-repo.interface';

@Injectable()
export class DeleteStockUseCase {
  constructor(
    @Inject('IStockRepo')
    private readonly stockRepository: IStockRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const stock = await this.stockRepository.findById(id);

    if (!stock) {
      throw new NotFoundException({
        message: 'Estoque não encontrado',
      });
    }

    await this.stockRepository.delete(id);
  }
}
