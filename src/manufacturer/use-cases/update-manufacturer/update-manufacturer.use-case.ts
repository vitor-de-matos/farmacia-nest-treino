import { UpdateManufacturerDTO } from 'src/manufacturer/models/dtos/update-manufacturer.dto';
import { IManufacturerRepo } from 'src/manufacturer/models/interface/manufacturer-repo.interface';
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class UpdateManufacturerUseCase {
  constructor(
    @Inject('IManufacturerRepo')
    private readonly manufacturerRepository: IManufacturerRepo,
  ) {}

  async update(manufacturerId: number, manufacturerDTO: UpdateManufacturerDTO) {
    const manufacturer =
      await this.manufacturerRepository.findById(manufacturerId);
    if (!manufacturer) {
      throw new NotFoundException({
        message: 'Lote não encontrado',
      });
    }

    const updated = await this.manufacturerRepository.update(
      manufacturerId,
      manufacturerDTO,
    );

    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar o lote no banco de dados',
      });
    }

    return updated;
  }
}
