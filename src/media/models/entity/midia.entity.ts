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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 120 })
  name: string;

  @Column({ name: 'icone', type: 'boolean' })
  icon: boolean;

  @Column({ name: 'url', type: 'varchar', nullable: true })
  url: string;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => Produto, (produto) => produto.media, { nullable: true })
  @JoinColumn({ name: 'id_produto' })
  product: Produto;
}
