import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IItemSaleRepo } from 'src/itemSale/models/interface/item-sale-repo.interface';

@Injectable()
export class DeleteItemSaleUseCase {
  constructor(
    @Inject('IItemSaleRepo')
    private readonly itemSaleRepository: IItemSaleRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const itemSale = await this.itemSaleRepository.findById(id);

    if (!itemSale) {
      throw new NotFoundException({
        message: 'Item de venda não encontrado',
      });
    }

    await this.itemSaleRepository.delete(id);
  }
}
