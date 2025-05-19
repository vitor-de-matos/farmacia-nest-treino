import { UpdateStockDTO } from 'src/stock/models/dtos/update-stock.dto';
import { IStockRepo } from 'src/stock/models/interface/stock-repo.interface';
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class UpdateStockUseCase {
  constructor(
    @Inject('IStockRepo')
    private readonly stockRepository: IStockRepo,
  ) {}

  async update(stockId: number, stockDTO: UpdateStockDTO) {
    const stock = await this.stockRepository.findById(stockId);
    if (!stock) {
      throw new NotFoundException({
        message: 'Estoque não encontrado',
      });
    }

    const updated = await this.stockRepository.update(stockId, stockDTO);

    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar entre em contato com o suporte',
      });
    }

    return updated;
  }
}
