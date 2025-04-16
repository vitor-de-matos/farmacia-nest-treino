import { CreateProdutoDTO } from '../dto/create-produto.dto';
import { UpdateProdutoDTO } from '../dto/update-produto.dto';
import { FindProdutoDTO } from '../dto/find-produto.dto';
import { Produto } from '../entity/product.entity';

export interface IProdutoRepo {
  create(productDTO: CreateProdutoDTO): Promise<number>;
  find(filters: FindProdutoDTO): Promise<{
    data: Produto[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<Produto | undefined>;
  update(id: number, productDTO: UpdateProdutoDTO): Promise<Produto>;
  delete(id: number): Promise<void>;
}
