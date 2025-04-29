import { Inject, Injectable } from '@nestjs/common';
import { FindCategoryDTO } from 'src/category/models/dtos/find-catetegory.dto';
import { Categoria } from 'src/category/models/entity/category.entity';
import { ICategoryRepo } from 'src/category/models/interface/category-repo.interface';

@Injectable()
export class FindAllCategoryUseCase {
  constructor(
    @Inject('ICategoryRepo')
    private readonly categoryRepository: ICategoryRepo,
  ) {}

  async find(categoryDTO: FindCategoryDTO): Promise<{
    data: Categoria[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.categoryRepository.find(categoryDTO);
  }
}
