import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateSalesDTO } from 'src/sales/models/dtos/create-sales.dto';
import { ISalesRepo } from 'src/sales/models/interface/sales-repo.interface';
import { IStockRepo } from 'src/stock/models/interface/stock-repo.interface';

@Injectable()
export class CreateSalesUseCase {
  constructor(
    @Inject('ISalesRepo')
    private readonly salesRepository: ISalesRepo,
  ) {}

  async create(salesDTO: CreateSalesDTO): Promise<number> {
    const salesCreated = await this.salesRepository.create(salesDTO);
    if (isNaN(salesCreated)) {
      throw new BadRequestException({
        message: 'Resposta invalida; entre em contato com o suporte',
      });
    }
    return salesCreated;
  }
}
