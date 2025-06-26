import { Produto } from '../../../products/models/entity/product.entity';
import { Venda } from '../../../sales/models/entity/sales.entity';
import { Lote } from '../../../batch/models/entity/batch.entity';
import {
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
  Entity,
} from 'typeorm';

@Entity()
export class ItemVenda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'quantidade', type: 'integer' })
  quantity: number;

  @Column({ name: 'preco_unitario', type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ name: 'subtotal', type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Venda, (venda) => venda.itemSale, { nullable: false })
  @JoinColumn({ name: 'id_venda' })
  sale: Venda;

  @ManyToOne(() => Produto, (produto) => produto.itemsSold, { nullable: false })
  @JoinColumn({ name: 'id_produto' })
  product: Produto;

  @ManyToOne(() => Lote, (lote) => lote.items, { nullable: false })
  @JoinColumn({ name: 'id_lote' })
  batch: Lote;
}
