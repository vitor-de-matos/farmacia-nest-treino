import { Venda } from '../../../sales/models/entity/sales.entity';
import { FuncionarioLogin } from '../../../employee-login/models/entity/employee-login.entity';

import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  Column,
  Entity,
} from 'typeorm';

export enum TipoPessoa {
  CLIENTE = 'cliente',
  FUNCIONARIO = 'funcionario',
}

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 150 })
  name: string;

  @Column({ name: 'documento', type: 'varchar', nullable: true })
  document?: string;

  @Column({ name: 'telefone', type: 'varchar', nullable: true })
  telephone?: string;

  @Column({ name: 'email', type: 'varchar', nullable: true })
  email?: string;

  @Column({ name: 'tipo', type: 'enum', enum: TipoPessoa })
  type: TipoPessoa;

  @Column({ name: 'recebeDesconto', type: 'boolean', default: false })
  receivesDiscount: boolean;

  @Column({
    name: 'percentualDesconto',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  discountPercentage?: number;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamptz' })
  updatedAt: Date;

  @OneToOne(() => FuncionarioLogin, (login) => login.person)
  employeeLogin?: FuncionarioLogin;

  @OneToMany(() => Venda, (venda) => venda.customer)
  buys: Venda[];

  @OneToMany(() => Venda, (venda) => venda.employee)
  sales: Venda[];
}
