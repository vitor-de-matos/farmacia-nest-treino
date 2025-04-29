import { Produto } from 'src/products/models/entity/product.entity';
import { Lote } from 'src/batch/models/entity/batch.entity';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Column,
  Entity,
} from 'typeorm';

@Entity()
export class PromocaoLote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'preco_promocional',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  promotionPrice: number;

  @Column({ name: 'inicio_promocao', type: 'timestamptz' })
  startDate: Date;

  @Column({ name: 'fim_promocao', type: 'timestamptz' })
  endDate: Date;

  @Column({
    name: 'encerrada',
    type: 'boolean',
    default: false,
  })
  autoEnded: boolean;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => Produto, (produto) => produto.batchPromotions, {
    nullable: false,
  })
  @JoinColumn({ name: 'id_produto' })
  product: Produto;

  @ManyToOne(() => Lote, (lote) => lote.batchPromotions, { nullable: false })
  @JoinColumn({ name: 'id_lote' })
  batch: Lote;
}
