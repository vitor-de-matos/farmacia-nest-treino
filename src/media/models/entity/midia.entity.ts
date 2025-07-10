import { Exclude, Expose } from 'class-transformer';
import { Produto } from '../../../products/models/entity/product.entity';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  Entity,
  Column,
} from 'typeorm';

@Entity()
export class Midia {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ name: 'nome', type: 'varchar', length: 120 })
  name: string;

  @Expose()
  @Column({ name: 'icone', type: 'boolean' })
  icon: boolean;

  @Expose()
  @Column({ name: 'url', type: 'varchar', nullable: true })
  url: string;

  @Exclude()
  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  createdAt: Date;

  @Exclude()
  @ManyToOne(() => Produto, (produto) => produto.media, { nullable: true })
  @JoinColumn({ name: 'id_produto' })
  product: Produto;
}
