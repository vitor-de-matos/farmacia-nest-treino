import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateStockDTO } from 'src/stock/models/dtos/create-stock.dto';
import { IStockRepo } from 'src/stock/models/interface/stock-repo.interface';

@Injectable()
export class CreateStockUseCase {
  constructor(
    @Inject('IStockRepo')
    private readonly stockRepository: IStockRepo,
  ) {}

  async create(stockDTO: CreateStockDTO): Promise<number> {
    const stockCreated = await this.stockRepository.create(stockDTO);
    if (isNaN(stockCreated)) {
      throw new BadRequestException({
        message: 'Resposta invalida; entre em contato com o suporte',
      });
    }
    return stockCreated;
  }
}
