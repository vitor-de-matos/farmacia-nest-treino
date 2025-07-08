import { UpdateItemSaleDTO } from 'src/itemSale/models/dtos/update-item-sale.dto';
import { IItemSaleRepo } from 'src/itemSale/models/interface/item-sale-repo.interface';
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class UpdateItemSaleUseCase {
  constructor(
    @Inject('IItemSaleRepo')
    private readonly itemSaleRepository: IItemSaleRepo,
  ) {}

  async update(itemSaleId: number, itemSaleDTO: UpdateItemSaleDTO) {
    const itemSale = await this.itemSaleRepository.findById(itemSaleId);
    if (!itemSale) {
      throw new NotFoundException({
        message: 'item da venda não encontrado',
      });
    }

    if (
      (itemSaleDTO.quantity !== undefined &&
        itemSale.quantity !== itemSaleDTO.quantity) ||
      (itemSaleDTO.unitPrice !== undefined &&
        itemSale.unitPrice !== itemSaleDTO.unitPrice)
    ) {
      const newQuantity = itemSaleDTO.quantity ?? itemSale.quantity;
      const newUnitPrice = itemSaleDTO.unitPrice ?? itemSale.unitPrice;

      itemSaleDTO.subtotal = newQuantity * newUnitPrice;
    }

    const updated = await this.itemSaleRepository.update(
      itemSaleId,
      itemSaleDTO,
    );

    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar o lote entre em contato com o suporte',
      });
    }

    return updated;
  }
}
