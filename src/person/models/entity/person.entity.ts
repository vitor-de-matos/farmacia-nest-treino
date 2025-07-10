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
import { Exclude, Expose } from 'class-transformer';

export enum TipoPessoa {
  CLIENTE = 'cliente',
  FUNCIONARIO = 'funcionario',
}

@Entity()
export class Pessoa {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ name: 'nome', type: 'varchar', length: 150 })
  name: string;

  @Expose()
  @Column({ name: 'documento', type: 'varchar', nullable: true })
  document?: string;

  @Expose()
  @Column({ name: 'telefone', type: 'varchar', nullable: true })
  telephone?: string;

  @Expose()
  @Column({ name: 'email', type: 'varchar', nullable: true })
  email?: string;

  @Expose()
  @Column({ name: 'tipo', type: 'enum', enum: TipoPessoa })
  type: TipoPessoa;

  @Expose()
  @Column({ name: 'recebeDesconto', type: 'boolean', default: false })
  receivesDiscount: boolean;

  @Expose()
  @Column({
    name: 'percentualDesconto',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  discountPercentage?: number;

  @Exclude()
  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  @OneToOne(() => FuncionarioLogin, (login) => login.person)
  employeeLogin?: FuncionarioLogin;

  @Exclude()
  @OneToMany(() => Venda, (venda) => venda.customer)
  buys: Venda[];

  @Exclude()
  @OneToMany(() => Venda, (venda) => venda.employee)
  sales: Venda[];

  constructor(partial: Partial<Pessoa>) {
    Object.assign(this, partial);
  }
}
