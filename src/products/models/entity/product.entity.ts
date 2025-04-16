import { Lote } from 'src/batch/models/entity/batch.entity';
import { PromocaoLote } from 'src/batchPromotion/models/entity/batchPromotion.entity';
import { Categoria } from 'src/category/models/entity/category.entity';
import { ItemVenda } from 'src/itemSale/models/entity/item-sale.entity';
import { Fabricante } from 'src/manufacturer/models/entity/manufacturer.entity';
import { Midia } from 'src/media/models/entity/midia.entity';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum TipoTarja {
  SEM_TARJA = 'sem_tarja',
  VERMELHA = 'vermelha',
  PRETA = 'preta',
}

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 120 })
  name: string;

  @Column({ name: 'descricao', type: 'varchar', nullable: true })
  description: string;

  @Column({ name: 'preco', type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'tarja', type: 'enum', enum: TipoTarja, nullable: true })
  labelType: TipoTarja;

  @Column({ name: 'controlado', type: 'boolean', default: false })
  controlled: boolean;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Midia, (midia) => midia.product)
  media: Midia[];

  @OneToMany(() => Lote, (lote) => lote.product)
  batches: Lote[];

  @OneToMany(() => PromocaoLote, (promocaoLote) => promocaoLote.product)
  batchPromotions: PromocaoLote[];

  @OneToMany(() => ItemVenda, (itemVenda) => itemVenda.product)
  itemsSold: ItemVenda[];

  @ManyToOne(() => Categoria, (categoria) => categoria.products, {
    nullable: true,
  })
  @JoinColumn({ name: 'id_categoria' })
  category: Categoria;

  @ManyToOne(() => Fabricante, (fabricante) => fabricante.products, {
    nullable: true,
  })
  @JoinColumn({ name: 'id_fabricante' })
  manufacturer: Fabricante;
}
