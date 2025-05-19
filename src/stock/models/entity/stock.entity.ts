import { Lote } from 'src/batch/models/entity/batch.entity';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  Entity,
  Column,
} from 'typeorm';

export enum TipoMovimentacao {
  ENTRADA = 'entrada',
  SAIDA = 'saida',
}

@Entity()
export class Estoque {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'quantidade', type: 'integer' })
  quantity: number;

  @Column({ name: 'movimentacao', type: 'enum', enum: TipoMovimentacao })
  movementType: TipoMovimentacao;

  @Column({ name: 'descricao', type: 'varchar', nullable: true })
  observation?: string;

  @CreateDateColumn({ name: 'data_movimentacao', type: 'timestamptz' })
  movementDate: Date;

  @ManyToOne(() => Lote, (lote) => lote.stockMovements, { nullable: false })
  @JoinColumn({ name: 'id_lote' })
  batch: Lote;
}
