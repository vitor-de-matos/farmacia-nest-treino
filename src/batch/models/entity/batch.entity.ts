import { PromocaoLote } from '../../../batchPromotion/models/entity/batch-promotion.entity';
import { ItemVenda } from '../../../itemSale/models/entity/item-sale.entity';
import { Produto } from '../../../products/models/entity/product.entity';
import { Estoque } from '../../../stock/models/entity/stock.entity';
import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Entity,
  Column,
} from 'typeorm';

@Entity()
export class Lote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'codigo_lote', type: 'varchar', length: 50 })
  code: string;

  @Column({ name: 'validade', type: 'timestamptz' })
  expiresAt: Date;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Estoque, (estoque) => estoque.batch)
  stockMovements: Estoque[];

  @OneToMany(() => PromocaoLote, (promocaoLote) => promocaoLote.batch)
  batchPromotions: PromocaoLote[];

  @OneToMany(() => ItemVenda, (itemVenda) => itemVenda.batch)
  items: ItemVenda[];

  @ManyToOne(() => Produto, (produto) => produto.batches, { nullable: false })
  @JoinColumn({ name: 'id_produto' })
  product: Produto;
}
