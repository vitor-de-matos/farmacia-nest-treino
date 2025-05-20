import { CreateItemSaleDTO } from 'src/itemSale/models/dtos/create-item-sale.dto';
import { TipoMovimentacao } from 'src/stock/models/entity/stock.entity';
import { UpdateStockDTO } from 'src/stock/models/dtos/update-stock.dto';
import { IItemSaleRepo } from 'src/itemSale/models/interface/item-sale-repo.interface';
import { IProductRepo } from 'src/products/models/interface/produto-repo.interface';
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
    const stock = await this.stockRepository.find({
      batchId: itemSaleDTO.batchId,
    });
    const availableQuantity = stock.data[0].quantity - itemSaleDTO.quantity;

    if (availableQuantity >= 0) {
      const updateDTO: UpdateStockDTO = {
        quantity: availableQuantity,
        movementType: TipoMovimentacao.SAIDA,
        batchId: itemSaleDTO.batchId,
      };

      if (stock.data[0].quantity >= itemSaleDTO.quantity) {
        await this.stockRepository.update(stock.data[0].id, updateDTO);
      } else {
        throw new BadRequestException({ message: 'Estoque insuficiente' });
      }
    } else {
      throw new NotFoundException({ message: 'Estoque não encontrado' });
    }

    const product = await this.productRepository.findById(
      itemSaleDTO.productId,
    );

    if (!product) {
      throw new NotFoundException({ message: 'Produto não encontrado' });
    }

    itemSaleDTO.unitPrice = product.price;

    itemSaleDTO.subtotal = itemSaleDTO.unitPrice * itemSaleDTO.quantity;
    const itemSaleCreated = await this.itemSaleRepository.create(itemSaleDTO);
    if (isNaN(itemSaleCreated)) {
      throw new BadRequestException({
        message: 'Resposta invalida; entre em contato com o suporte',
      });
    }
    return itemSaleCreated;
  }
}
