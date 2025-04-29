import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateItemSaleDTO } from 'src/itemSale/models/dtos/create-item-sale.dto';
import { IItemSaleRepo } from 'src/itemSale/models/interface/item-sale-repo.interface';

@Injectable()
export class CreateItemSaleUseCase {
  constructor(
    @Inject('IItemSaleRepo')
    private readonly itemSaleRepository: IItemSaleRepo,
  ) {}

  async create(itemSaleDTO: CreateItemSaleDTO): Promise<number> {
    const itemSaleCreated = await this.itemSaleRepository.create(itemSaleDTO);
    if (isNaN(itemSaleCreated)) {
      throw new BadRequestException({
        message: 'Resposta invalida; entre em contato com o suporte',
      });
    }
    return itemSaleCreated;
  }
}
