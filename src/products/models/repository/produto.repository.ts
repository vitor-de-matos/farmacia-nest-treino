import { endOfDay, isValid, parse, startOfDay } from 'date-fns';
import { UpdateProdutoDTO } from '../dto/update-produto.dto';
import { CreateProdutoDTO } from '../dto/create-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { FindProdutoDTO } from '../dto/find-produto.dto';
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

  async create(productDTO: CreateProdutoDTO): Promise<number> {
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

  async find(filters: FindProdutoDTO): Promise<{
    data: Produto[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    let parsedvalidadeStart: Date | undefined;
    let parsedvalidadeEnd: Date | undefined;

    if (filters.validadeStart) {
      parsedvalidadeStart = parse(
        filters.validadeStart,
        'yyyy-MM-dd',
        new Date(),
      );
      if (!isValid(parsedvalidadeStart)) {
        parsedvalidadeStart = parse(
          filters.validadeStart,
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

    if (filters.validadeEnd) {
      parsedvalidadeEnd = parse(filters.validadeEnd, 'yyyy-MM-dd', new Date());
      if (!isValid(parsedvalidadeEnd)) {
        parsedvalidadeEnd = parse(
          filters.validadeEnd,
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
        ...(filters.nome && { name: ILike(`%${filters.nome}%`) }),
        ...(filters.categoriaId !== undefined && {
          categoriaId: filters.categoriaId,
        }),
        ...(filters.fabricanteId !== undefined && {
          fabricanteId: filters.fabricanteId,
        }),
        ...(filters.lote !== undefined && { lote: ILike(`%${filters.lote}%`) }),
        ...(filters.precoMin !== undefined && filters.precoMax !== undefined
          ? { preco: Between(filters.precoMin, filters.precoMax) }
          : filters.precoMin !== undefined
            ? { preco: MoreThanOrEqual(filters.precoMin) }
            : filters.precoMax !== undefined
              ? { preco: LessThanOrEqual(filters.precoMax) }
              : {}),

        ...(filters.quantidadeMin !== undefined &&
        filters.quantidadeMax !== undefined
          ? {
              quantidade: Between(filters.quantidadeMin, filters.quantidadeMax),
            }
          : filters.quantidadeMin !== undefined
            ? { quantidade: MoreThanOrEqual(filters.quantidadeMin) }
            : filters.quantidadeMax !== undefined
              ? { quantidade: LessThanOrEqual(filters.quantidadeMax) }
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

  async update(id: number, productDTO: UpdateProdutoDTO): Promise<Produto> {
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
