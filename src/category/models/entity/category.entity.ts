import { Produto } from 'src/products/models/entity/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 120 })
  name: string;

  @OneToMany(() => Produto, (produto) => produto.category)
  products: Produto[];
}
