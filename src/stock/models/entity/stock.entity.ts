import { Exclude, Expose } from 'class-transformer';
import { Lote } from '../../../batch/models/entity/batch.entity';
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
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ name: 'quantidade', type: 'integer' })
  quantity: number;

  @Expose()
  @Column({ name: 'movimentacao', type: 'enum', enum: TipoMovimentacao })
  movementType: TipoMovimentacao;

  @Expose()
  @Column({ name: 'descricao', type: 'varchar', nullable: true })
  observation?: string;

  @Expose()
  @CreateDateColumn({ name: 'data_movimentacao', type: 'timestamptz' })
  movementDate: Date;

  @Exclude()
  @ManyToOne(() => Lote, (lote) => lote.stockMovements, { nullable: false })
  @JoinColumn({ name: 'id_lote' })
  batch: Lote;
}
