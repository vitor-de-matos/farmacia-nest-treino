import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateManufacturerDTO } from 'src/manufacturer/models/dtos/create-manufacturer.dto';
import { IManufacturerRepo } from 'src/manufacturer/models/interface/manufacturer-repo.interface';

@Injectable()
export class CreateManufacturerUseCase {
  constructor(
    @Inject('IManufacturerRepo')
    private readonly manufacturerRepository: IManufacturerRepo,
  ) {}

  async create(manufacturerDTO: CreateManufacturerDTO): Promise<number> {
    const manufacturerCreated =
      await this.manufacturerRepository.create(manufacturerDTO);
    if (isNaN(manufacturerCreated)) {
      throw new BadRequestException({
        message: 'Resposta invalida; entre em contato com o suporte',
      });
    }
    return manufacturerCreated;
  }
}
