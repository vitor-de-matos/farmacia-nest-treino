import { CreateProductDTO } from '../dto/create-product.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';
import { FindProductDTO } from '../dto/find-product.dto';
import { Produto } from '../entity/product.entity';

export interface IProductRepo {
  create(productDTO: CreateProductDTO): Promise<number>;
  find(filters: FindProductDTO): Promise<{
    data: Produto[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<Produto | undefined>;
  update(id: number, productDTO: UpdateProductDTO): Promise<Produto>;
  delete(id: number): Promise<void>;
}
