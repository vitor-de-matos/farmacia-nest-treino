import { ItemVenda } from 'src/itemSale/models/entity/item-sale.entity';
import { Pagamento } from 'src/payment/models/entity/payment.entity';
import { Pessoa } from 'src/person/models/entity/person.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Venda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cpf', type: 'varchar', length: 11, nullable: true })
  cpf?: string;

  @Column({ name: 'valor_total', type: 'decimal', precision: 10, scale: 2 })
  totalValue: number;

  @CreateDateColumn({ name: 'data_emissao', type: 'timestamptz' })
  emissionDate: Date;

  @OneToMany(() => ItemVenda, (item) => item.sale, { cascade: true })
  items: ItemVenda[];

  @OneToMany(() => Pagamento, (pagamento) => pagamento.sale, { cascade: true })
  payments: Pagamento[];

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.buys, { nullable: true })
  @JoinColumn({ name: 'id_cliente' })
  customer?: Pessoa;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.sales, { nullable: false })
  @JoinColumn({ name: 'id_funcionario' })
  employee: Pessoa;
}
