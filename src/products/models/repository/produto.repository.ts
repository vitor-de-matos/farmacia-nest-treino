import { endOfDay, isValid, parse, startOfDay } from 'date-fns';
import { UpdateProductDTO } from '../dto/update-produto.dto';
import { CreateProductDTO } from '../dto/create-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { FindProductDTO } from '../dto/find-produto.dto';
import { IProductRepo } from '../interface/produto-repo.interface';
import { Produto } from '../entity/product.entity';
import {
  FindManyOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
  Between,
  ILike,
} from 'typeorm';
import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ProductRepository implements IProductRepo {
  constructor(
    @InjectRepository(Produto, DB_PG_DATABASE)
    private readonly repository: Repository<Produto>,
  ) {}

  async create(productDTO: CreateProductDTO): Promise<number> {
    const controlledBoolean =
      typeof productDTO.controlled === 'string'
        ? productDTO.controlled.toLowerCase() === 'true'
        : Boolean(productDTO.controlled);

    const result = await this.repository.save({
      ...productDTO,
      controlled: controlledBoolean,
      category: productDTO.categoryId ? { id: productDTO.categoryId } : null,
      manufacturer: productDTO.manufacturerId
        ? { id: productDTO.manufacturerId }
        : null,
    });
    return result.id;
  }

  async find(filters: FindProductDTO): Promise<{
    data: Produto[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    let parsedvalidadeStart: Date | undefined;
    let parsedvalidadeEnd: Date | undefined;

    if (filters.deadlineStart) {
      parsedvalidadeStart = parse(
        filters.deadlineStart,
        'yyyy-MM-dd',
        new Date(),
      );
      if (!isValid(parsedvalidadeStart)) {
        parsedvalidadeStart = parse(
          filters.deadlineStart,
          'dd-MM-yyyy',
          new Date(),
        );
      }
      if (!isValid(parsedvalidadeStart)) {
        throw new BadRequestException(
          'Formato de data inválido. Use "YYYY-MM-DD" ou "DD-MM-YYYY".',
        );
      }
    }

    if (filters.deadlineEnd) {
      parsedvalidadeEnd = parse(filters.deadlineEnd, 'yyyy-MM-dd', new Date());
      if (!isValid(parsedvalidadeEnd)) {
        parsedvalidadeEnd = parse(
          filters.deadlineEnd,
          'dd-MM-yyyy',
          new Date(),
        );
      }
      if (!isValid(parsedvalidadeEnd)) {
        throw new BadRequestException(
          'Formato de data inválido para updatedAt. Use "YYYY-MM-DD" ou "DD-MM-YYYY".',
        );
      }
    }

    const queryOptions: FindManyOptions<Produto> = {
      where: {
        ...(filters.id && { id: filters.id }),
        ...(filters.name && { name: ILike(`%${filters.name}%`) }),
        ...(filters.categoryId !== undefined && {
          categoriaId: filters.categoryId,
        }),
        ...(filters.manufacturerId !== undefined && {
          fabricanteId: filters.manufacturerId,
        }),
        ...(filters.batch !== undefined && {
          lote: ILike(`%${filters.batch}%`),
        }),
        ...(filters.minPrice !== undefined && filters.maxPrice !== undefined
          ? { preco: Between(filters.minPrice, filters.maxPrice) }
          : filters.minPrice !== undefined
            ? { preco: MoreThanOrEqual(filters.minPrice) }
            : filters.maxPrice !== undefined
              ? { preco: LessThanOrEqual(filters.maxPrice) }
              : {}),

        ...(filters.minQuantity !== undefined &&
        filters.maxQuantity !== undefined
          ? {
              quantidade: Between(filters.minQuantity, filters.maxQuantity),
            }
          : filters.minQuantity !== undefined
            ? { quantidade: MoreThanOrEqual(filters.minQuantity) }
            : filters.maxQuantity !== undefined
              ? { quantidade: LessThanOrEqual(filters.maxQuantity) }
              : {}),

        ...(parsedvalidadeEnd && parsedvalidadeStart
          ? {
              validade: Between(
                startOfDay(parsedvalidadeStart),
                endOfDay(parsedvalidadeEnd),
              ),
            }
          : parsedvalidadeStart
            ? { validade: MoreThanOrEqual(startOfDay(parsedvalidadeStart)) }
            : parsedvalidadeEnd
              ? { validade: LessThanOrEqual(endOfDay(parsedvalidadeEnd)) }
              : {}),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
      relations: { category: true, manufacturer: true, media: true },
    };

    const [products, totalItems] =
      await this.repository.findAndCount(queryOptions);

    const totalPages = filters.quantity
      ? Math.ceil(totalItems / filters.quantity)
      : 1;
    const currentPage = filters.page || 1;
    return { data: products, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<Produto | undefined> {
    const product = await this.repository.findOne({
      where: { id: id },
    });
    if (!product) {
      throw new NotFoundException({ message: 'Produto não encontrado' });
    }
    return product;
  }

  async update(id: number, productDTO: UpdateProductDTO): Promise<Produto> {
    const product = await this.repository.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException({ message: 'Produto não encontrado' });
    }

    const UpdatedProduct = await this.repository.save({
      ...product,
      ...productDTO,
    });
    return UpdatedProduct;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
