import { CreateItemSaleDTO } from 'src/itemSale/models/dtos/create-item-sale.dto';
import { TipoMovimentacao } from 'src/stock/models/entity/stock.entity';
import { UpdateStockDTO } from 'src/stock/models/dtos/update-stock.dto';
import { IItemSaleRepo } from 'src/itemSale/models/interface/item-sale-repo.interface';
import { IProductRepo } from 'src/products/models/interface/product-repo.interface';
import { IStockRepo } from 'src/stock/models/interface/stock-repo.interface';
import {
  BadRequestException,
  NotFoundException,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class CreateItemSaleUseCase {
  constructor(
    @Inject('IItemSaleRepo')
    private readonly itemSaleRepository: IItemSaleRepo,
    @Inject('IProductRepo')
    private readonly productRepository: IProductRepo,
    @Inject('IStockRepo')
    private readonly stockRepository: IStockRepo,
  ) {}

  async create(itemSaleDTO: CreateItemSaleDTO): Promise<number> {
    const product = await this.productRepository.findById(
      itemSaleDTO.productId,
    );

    const stockResult = await this.stockRepository.find({
      batchId: itemSaleDTO.batchId,
    });

    const stock = stockResult?.data?.[0];

    if (!stock) {
      throw new NotFoundException({ message: 'Estoque não encontrado' });
    }

    if (stock.quantity < itemSaleDTO.quantity) {
      throw new BadRequestException({ message: 'Estoque insuficiente' });
    }

    const updatedQuantity = stock.quantity - itemSaleDTO.quantity;

    const updateDTO: UpdateStockDTO = {
      quantity: updatedQuantity,
      movementType: TipoMovimentacao.SAIDA,
      batchId: itemSaleDTO.batchId,
    };

    await this.stockRepository.update(stock.id, updateDTO);

    itemSaleDTO.unitPrice = product.price;
    itemSaleDTO.subtotal = itemSaleDTO.unitPrice * itemSaleDTO.quantity;

    const itemSaleCreated = await this.itemSaleRepository.create(itemSaleDTO);

    if (isNaN(itemSaleCreated)) {
      throw new BadRequestException({
        message: 'Resposta inválida; entre em contato com o suporte',
      });
    }

    return itemSaleCreated;
  }
}
