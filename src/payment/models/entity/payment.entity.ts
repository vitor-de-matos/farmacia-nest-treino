import { Venda } from 'src/sales/models/entity/sales.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'forma_pagamento', type: 'enum', enum: FormaPagamento })
  paymentMethod: FormaPagamento;

  @Column({ name: 'valor', type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column({ name: 'parcela', type: 'int', nullable: true })
  installment?: number;

  @Column({ name: 'total_parcelas', type: 'int', nullable: true })
  totalInstallments?: number;

  @Column({ name: 'vencimento', type: 'timestamptz', nullable: true })
  dueDate?: Date;

  @Column({
    name: 'status',
    type: 'enum',
    enum: StatusPagamento,
    default: StatusPagamento.PENDENTE,
  })
  status: StatusPagamento;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => Venda, (venda) => venda.payments, { nullable: false })
  @JoinColumn({ name: 'id_venda' })
  sale: Venda;
}
