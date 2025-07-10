import { Exclude, Expose } from 'class-transformer';
import { Venda } from '../../../sales/models/entity/sales.entity';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Column,
  Entity,
} from 'typeorm';

export enum FormaPagamento {
  DINHEIRO = 'dinheiro',
  DEBITO = 'debito',
  CREDITO = 'credito',
  PIX = 'pix',
  BOLETO = 'boleto',
  OUTRO = 'outro',
}

export enum StatusPagamento {
  PENDENTE = 'pendente',
  PAGO = 'pago',
  CANCELADO = 'cancelado',
}

@Entity()
export class Pagamento {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ name: 'forma_pagamento', type: 'enum', enum: FormaPagamento })
  paymentMethod: FormaPagamento;

  @Expose()
  @Column({ name: 'valor', type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Expose()
  @Column({ name: 'parcela', type: 'int', nullable: true })
  installment?: number;

  @Expose()
  @Column({ name: 'total_parcelas', type: 'int', nullable: true })
  totalInstallments?: number;

  @Expose()
  @Column({ name: 'vencimento', type: 'timestamptz', nullable: true })
  dueDate?: Date;

  @Expose()
  @Column({
    name: 'status',
    type: 'enum',
    enum: StatusPagamento,
    default: StatusPagamento.PENDENTE,
  })
  status: StatusPagamento;

  @Exclude()
  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  @ManyToOne(() => Venda, (venda) => venda.payments, { nullable: false })
  @JoinColumn({ name: 'id_venda' })
  sale: Venda;
}
