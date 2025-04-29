import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { UpdateCategoryDTO } from '../dtos/update-category.dto';
import { FindCategoryDTO } from '../dtos/find-catetegory.dto';
import { Categoria } from '../entity/category.entity';

export interface ICategoryRepo {
  create(categoryDTO: CreateCategoryDTO): Promise<number>;
  find(filters: FindCategoryDTO): Promise<{
    data: Categoria[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<Categoria | undefined>;
  update(id: number, categoryDTO: UpdateCategoryDTO): Promise<Categoria>;
  delete(id: number): Promise<void>;
}
