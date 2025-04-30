import { FindManufacturerDTO } from 'src/manufacturer/models/dtos/find-manufacturer.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IManufacturerRepo } from 'src/manufacturer/models/interface/manufacturer-repo.interface';
import { Fabricante } from 'src/manufacturer/models/entity/manufacturer.entity';

@Injectable()
export class FindAllManufacturerUseCase {
  constructor(
    @Inject('IManufacturerRepo')
    private readonly manufacturerRepository: IManufacturerRepo,
  ) {}

  async find(manufacturerDTO: FindManufacturerDTO): Promise<{
    data: Fabricante[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.manufacturerRepository.find(manufacturerDTO);
  }
}
