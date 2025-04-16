import { FindManyOptions, ILike, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { CreateMidiaDTO } from '../dtos/create-midia.dto';
import { UpdateMidiaDTO } from '../dtos/update-midia.dto';
import { FindMidiaDTO } from '../dtos/find-midia.dto';
import { IMidiaRepo } from '../interface/midia-repo.interface';
import { Midia } from '../entity/midia.entity';

@Injectable()
export class MidiaRepository implements IMidiaRepo {
  constructor(
    @InjectRepository(Midia, DB_PG_DATABASE)
    private readonly repository: Repository<Midia>,
  ) {}

  async create(mediaDTO: CreateMidiaDTO): Promise<number> {
    const result = await this.repository.save(mediaDTO);
    return result.id;
  }

  async find(filters: FindMidiaDTO): Promise<{
    data: Midia[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<Midia> = {
      where: {
        ...(filters.name && { name: ILike(`%${filters.name}%`) }),
        ...(filters.icon && { icon: filters.icon }),
        ...(filters.productId && { productId: filters.productId }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
    };

    const [medias, totalItems] =
      await this.repository.findAndCount(queryOptions);

    const totalPages = filters.quantity
      ? Math.ceil(totalItems / filters.quantity)
      : 1;
    const currentPage = filters.page || 1;
    return { data: medias, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<Midia | undefined> {
    const media = await this.repository.findOne({ where: { id: id } });
    if (!media) {
      throw new NotFoundException({ message: 'Midia não encontrada' });
    }
    return media;
  }

  async update(mediaId: number, mediaDTO: UpdateMidiaDTO): Promise<Midia> {
    const media = await this.repository.findOne({ where: { id: mediaId } });

    const UpdateMedia = await this.repository.save({
      ...media,
      ...mediaDTO,
    });

    return UpdateMedia;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
