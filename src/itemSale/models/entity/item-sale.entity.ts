import { Lote } from 'src/batch/models/entity/batch.entity';
import { Produto } from 'src/products/models/entity/product.entity';
import { Venda } from 'src/sales/models/entity/sales.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ItemVenda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'quantidade', type: 'integer' })
  quantidade: number;

  @Column({ name: 'preco_unitario', type: 'decimal', precision: 10, scale: 2 })
  precoUnitario: number;

  @Column({ name: 'subtotal', type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Venda, (venda) => venda.items, { nullable: false })
  @JoinColumn({ name: 'id_venda' })
  sale: Venda;

  @ManyToOne(() => Produto, (produto) => produto.itemsSold, { nullable: false })
  @JoinColumn({ name: 'id_produto' })
  product: Produto;

  @ManyToOne(() => Lote, (lote) => lote.items, { nullable: false })
  @JoinColumn({ name: 'id_lote' })
  batch: Lote;
}
