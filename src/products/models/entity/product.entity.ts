import { PromocaoLote } from '../../../batchPromotion/models/entity/batch-promotion.entity';
import { Fabricante } from '../../../manufacturer/models/entity/manufacturer.entity';
import { Categoria } from '../../../category/models/entity/category.entity';
import { ItemVenda } from '../../../itemSale/models/entity/item-sale.entity';
import { Midia } from '../../../media/models/entity/midia.entity';
import { Lote } from '../../../batch/models/entity/batch.entity';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
  Column,
  Entity,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

export enum TipoTarja {
  SEM_TARJA = 'sem_tarja',
  VERMELHA = 'vermelha',
  PRETA = 'preta',
}

@Entity()
export class Produto {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ name: 'nome', type: 'varchar', length: 120 })
  name: string;

  @Expose()
  @Column({ name: 'descricao', type: 'varchar', nullable: true })
  description: string;

  @Expose()
  @Column({ name: 'preco', type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Expose()
  @Column({ name: 'tarja', type: 'enum', enum: TipoTarja, nullable: true })
  labelType: TipoTarja;

  @Expose()
  @Column({ name: 'controlado', type: 'boolean', default: false })
  controlled: boolean;

  @Exclude()
  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamptz' })
  updatedAt: Date;

  @Expose()
  @OneToMany(() => Midia, (midia) => midia.product)
  media: Midia[];

  @Exclude()
  @OneToMany(() => Lote, (lote) => lote.product)
  batches: Lote[];

  @Exclude()
  @OneToMany(() => PromocaoLote, (promocaoLote) => promocaoLote.product)
  batchPromotions: PromocaoLote[];

  @Exclude()
  @OneToMany(() => ItemVenda, (itemVenda) => itemVenda.product)
  itemsSold: ItemVenda[];

  @Expose()
  @ManyToOne(() => Categoria, (categoria) => categoria.products, {
    nullable: true,
  })
  @JoinColumn({ name: 'id_categoria' })
  category: Categoria;

  @Expose()
  @ManyToOne(() => Fabricante, (fabricante) => fabricante.products, {
    nullable: true,
  })
  @JoinColumn({ name: 'id_fabricante' })
  manufacturer: Fabricante;
}
