import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IStockRepo } from 'src/stock/models/interface/stock-repo.interface';
import { Estoque } from 'src/stock/models/entity/stock.entity';

@Injectable()
export class FindStockUseCase {
  constructor(
    @Inject('IStockRepo')
    private readonly stockRepository: IStockRepo,
  ) {}

  async find(stockId: number): Promise<Estoque> {
    const stock = await this.stockRepository.findById(stockId);
    if (!stock) {
      throw new NotFoundException({
        message: 'Estoque não encontrado',
      });
    }
    return stock;
  }
}
