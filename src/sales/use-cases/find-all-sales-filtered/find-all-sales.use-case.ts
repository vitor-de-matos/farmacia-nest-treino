import { Inject, Injectable } from '@nestjs/common';
import { FindSalesDTO } from 'src/sales/models/dtos/find-sales.dto';
import { ISalesRepo } from 'src/sales/models/interface/sales-repo.interface';
import { Venda } from 'src/sales/models/entity/sales.entity';

@Injectable()
export class FindAllSalesUseCase {
  constructor(
    @Inject('ISalesRepo')
    private readonly salesRepository: ISalesRepo,
  ) {}

  async find(salesDTO: FindSalesDTO): Promise<{
    data: Venda[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.salesRepository.find(salesDTO);
  }
}
