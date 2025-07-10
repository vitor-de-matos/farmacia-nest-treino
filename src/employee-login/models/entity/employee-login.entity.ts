import { Exclude, Expose } from 'class-transformer';
import { Pessoa } from '../../../person/models/entity/person.entity';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  Entity,
  Column,
} from 'typeorm';

@Entity()
export class FuncionarioLogin {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ name: 'login', type: 'varchar', length: 100, unique: true })
  login: string;

  @Exclude()
  @Column({ name: 'senha', type: 'varchar', length: 255 })
  password: string;

  @Expose()
  @Column({ name: 'ativo', type: 'boolean', default: true })
  active: boolean;

  @Expose()
  @Column({ name: 'nivel_permissao', type: 'smallint' })
  permissionLevel: number;

  @Exclude()
  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  createdAt: Date;

  @Exclude()
  @Column({ name: 'refresh_token', type: 'text', nullable: true })
  refreshToken: string;

  @Exclude()
  @Column({
    name: 'refresh_token_expira_em',
    type: 'timestamptz',
    nullable: true,
  })
  refreshTokenExpiresAt: Date;

  @Expose()
  @OneToOne(() => Pessoa)
  @JoinColumn({ name: 'id_pessoa' })
  person: Pessoa;

  constructor(partial: Partial<FuncionarioLogin>) {
    Object.assign(this, partial);
  }
}
