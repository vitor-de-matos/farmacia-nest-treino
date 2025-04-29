import { UpdateCategoryDTO } from 'src/category/models/dtos/update-category.dto';
import { ICategoryRepo } from 'src/category/models/interface/category-repo.interface';
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    @Inject('ICategoryRepo')
    private readonly categoryRepository: ICategoryRepo,
  ) {}

  async update(categoryId: number, categoryDTO: UpdateCategoryDTO) {
    const category = await this.categoryRepository.findById(categoryId);
    if (!category) {
      throw new NotFoundException({
        message: 'Categoria não encontrado',
      });
    }

    const updated = await this.categoryRepository.update(
      categoryId,
      categoryDTO,
    );

    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar a categoria no banco de dados',
      });
    }

    return updated;
  }
}
