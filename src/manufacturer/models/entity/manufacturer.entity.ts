import { Produto } from 'src/products/models/entity/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Fabricante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 120 })
  name: string;

  @Column({ name: 'cnpj', type: 'varchar', nullable: true })
  cnpj: string;

  @Column({ name: 'contato', type: 'varchar', nullable: true })
  contact: string;

  @OneToMany(() => Produto, (produto) => produto.manufacturer)
  products: Produto[];
}
