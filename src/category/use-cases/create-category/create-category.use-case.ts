import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDTO } from 'src/category/models/dtos/create-category.dto';
import { ICategoryRepo } from 'src/category/models/interface/category-repo.interface';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('ICategoryRepo')
    private readonly categoryRepository: ICategoryRepo,
  ) {}

  async create(categoryDTO: CreateCategoryDTO): Promise<number> {
    const categoryCreated = await this.categoryRepository.create(categoryDTO);
    if (isNaN(categoryCreated)) {
      throw new BadRequestException({
        message: 'Resposta invalida; entre em contato com o suporte',
      });
    }
    return categoryCreated;
  }
}
