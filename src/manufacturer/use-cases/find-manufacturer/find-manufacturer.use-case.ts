import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IManufacturerRepo } from 'src/manufacturer/models/interface/manufacturer-repo.interface';
import { Fabricante } from 'src/manufacturer/models/entity/manufacturer.entity';

@Injectable()
export class FindManufacturerUseCase {
  constructor(
    @Inject('IManufacturerRepo')
    private readonly manufacturerRepository: IManufacturerRepo,
  ) {}

  async find(manufacturerId: number): Promise<Fabricante> {
    const manufacturer =
      await this.manufacturerRepository.findById(manufacturerId);
    if (!manufacturer) {
      throw new NotFoundException({
        message: 'Fabricante não encontrado',
      });
    }
    return manufacturer;
  }
}
