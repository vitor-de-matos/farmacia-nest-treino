import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IItemSaleRepo } from 'src/itemSale/models/interface/item-sale-repo.interface';
import { ItemVenda } from 'src/itemSale/models/entity/item-sale.entity';

@Injectable()
export class FindItemSaleUseCase {
  constructor(
    @Inject('IItemSaleRepo')
    private readonly itemSaleRepository: IItemSaleRepo,
  ) {}

  async find(itemSaleId: number): Promise<ItemVenda> {
    const itemSale = await this.itemSaleRepository.findById(itemSaleId);
    if (!itemSale) {
      throw new NotFoundException({
        message: 'Item de venda não encontrado',
      });
    }
    return itemSale;
  }
}
