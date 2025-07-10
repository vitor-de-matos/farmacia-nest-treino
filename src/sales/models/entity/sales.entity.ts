import { Exclude, Expose } from 'class-transformer';
import { ItemVenda } from '../../../itemSale/models/entity/item-sale.entity';
import { Pagamento } from '../../../payment/models/entity/payment.entity';
import { Pessoa } from '../../../person/models/entity/person.entity';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Column,
  Entity,
} from 'typeorm';

@Entity()
export class Venda {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ name: 'cpf', type: 'varchar', length: 11, nullable: true })
  cpf?: string;

  @Expose()
  @Column({ name: 'valor_total', type: 'decimal', precision: 10, scale: 2 })
  totalValue: number;

  @Expose()
  @CreateDateColumn({ name: 'data_emissao', type: 'timestamptz' })
  emissionDate: Date;

  @Exclude()
  @OneToMany(() => ItemVenda, (item) => item.sale, { cascade: true })
  itemSale: ItemVenda[];

  @Exclude()
  @OneToMany(() => Pagamento, (pagamento) => pagamento.sale, { cascade: true })
  payments: Pagamento[];

  @Expose()
  @ManyToOne(() => Pessoa, (pessoa) => pessoa.buys, { nullable: true })
  @JoinColumn({ name: 'id_cliente' })
  customer?: Pessoa;

  @Exclude()
  @ManyToOne(() => Pessoa, (pessoa) => pessoa.sales, { nullable: false })
  @JoinColumn({ name: 'id_funcionario' })
  employee: Pessoa;
}
