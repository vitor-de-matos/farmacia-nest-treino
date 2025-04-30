import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IManufacturerRepo } from 'src/manufacturer/models/interface/manufacturer-repo.interface';

@Injectable()
export class DeleteManufacturerUseCase {
  constructor(
    @Inject('IManufacturerRepo')
    private readonly manufacturerRepository: IManufacturerRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const manufacturer = await this.manufacturerRepository.findById(id);

    if (!manufacturer) {
      throw new NotFoundException({
        message: 'Fabricante não encontrado',
      });
    }

    await this.manufacturerRepository.delete(id);
  }
}
