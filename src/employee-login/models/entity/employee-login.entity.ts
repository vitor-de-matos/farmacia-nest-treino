import { Pessoa } from 'src/person/models/entity/person.entity';
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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'login', type: 'varchar', length: 100, unique: true })
  login: string;

  @Column({ name: 'senha', type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'ativo', type: 'boolean', default: true })
  active: boolean;

  @Column({ name: 'nivel_permissao', type: 'smallint' })
  permissionLevel: number;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  createdAt: Date;

  @OneToOne(() => Pessoa)
  @JoinColumn({ name: 'id_pessoa' })
  person: Pessoa;
}
