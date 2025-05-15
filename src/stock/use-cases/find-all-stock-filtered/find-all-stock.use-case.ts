import { Inject, Injectable } from '@nestjs/common';
import { FindStockDTO } from 'src/stock/models/dtos/find-stock.dto';
import { Estoque } from 'src/stock/models/entity/stock.entity';
import { IStockRepo } from 'src/stock/models/interface/stock-repo.interface';

@Injectable()
export class FindAllStockUseCase {
  constructor(
    @Inject('IStockRepo')
    private readonly stockRepository: IStockRepo,
  ) {}

  async find(stockDTO: FindStockDTO): Promise<{
    data: Estoque[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.stockRepository.find(stockDTO);
  }
}
