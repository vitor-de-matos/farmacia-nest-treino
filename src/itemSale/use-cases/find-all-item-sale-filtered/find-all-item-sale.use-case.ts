import { Inject, Injectable } from '@nestjs/common';
import { FindItemSaleDTO } from 'src/itemSale/models/dtos/find-item-sale.dto';
import { IItemSaleRepo } from 'src/itemSale/models/interface/item-sale-repo.interface';
import { ItemVenda } from 'src/itemSale/models/entity/item-sale.entity';

@Injectable()
export class FindAllItemSaleUseCase {
  constructor(
    @Inject('IItemSaleRepo')
    private readonly itemSaleRepository: IItemSaleRepo,
  ) {}

  async find(itemSaleDTO: FindItemSaleDTO): Promise<{
    data: ItemVenda[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.itemSaleRepository.find(itemSaleDTO);
  }
}
