import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICategoryRepo } from 'src/category/models/interface/category-repo.interface';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    @Inject('ICategoryRepo')
    private readonly categoryRepository: ICategoryRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundException({
        message: 'Categoria não encontrada',
      });
    }

    await this.categoryRepository.delete(id);
  }
}
