import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from '../entity/category.entity';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { ICategoryRepo } from '../interface/category-repo.interface';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { FindCategoryDTO } from '../dtos/find-catetegory.dto';
import { UpdateCategoryDTO } from '../dtos/update-category.dto';

@Injectable()
export class CategoryRepository implements ICategoryRepo {
  constructor(
    @InjectRepository(Categoria, DB_PG_DATABASE)
    private readonly repository: Repository<Categoria>,
  ) {}

  async create(categoryDTO: CreateCategoryDTO): Promise<number> {
    const result = await this.repository.save(categoryDTO);
    return result.id;
  }

  async find(filters: FindCategoryDTO): Promise<{
    data: Categoria[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<Categoria> = {
      where: {
        ...(filters.name && { name: ILike(`%${filters.name}%`) }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
    };

    const [categories, totalItems] =
      await this.repository.findAndCount(queryOptions);

    const totalPages = filters.quantity
      ? Math.ceil(totalItems / filters.quantity)
      : 1;
    const currentPage = filters.page || 1;
    return { data: categories, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<Categoria | undefined> {
    const category = await this.repository.findOne({ where: { id: id } });
    if (!category) {
      throw new NotFoundException({ message: 'Categoria não encontrada' });
    }
    return category;
  }

  async update(Id: number, categoryDTO: UpdateCategoryDTO): Promise<Categoria> {
    const category = await this.repository.findOne({ where: { id: Id } });

    const UpdateCategory = await this.repository.save({
      ...category,
      ...categoryDTO,
    });

    return UpdateCategory;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
