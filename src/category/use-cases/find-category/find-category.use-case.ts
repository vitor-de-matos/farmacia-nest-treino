import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICategoryRepo } from 'src/category/models/interface/category-repo.interface';
import { Categoria } from 'src/category/models/entity/category.entity';

@Injectable()
export class FindCategoryUseCase {
  constructor(
    @Inject('ICategoryRepo')
    private readonly CategoryRepository: ICategoryRepo,
  ) {}

  async find(CategoryId: number): Promise<Categoria> {
    const category = await this.CategoryRepository.findById(CategoryId);
    if (!category) {
      throw new NotFoundException({
        message: 'Categoria não encontrada',
      });
    }
    return category;
  }
}
