import { Inject, Injectable } from '@nestjs/common';
import { GatewayService } from './expiration-date.gateway';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IBatchRepo } from 'src/batch/models/interface/lote-repo.interface';

@Injectable()
export class ExpirationJob {
  constructor(
    @Inject('IBatchRepo')
    private readonly batchRepository: IBatchRepo,
    @Inject(GatewayService)
    private readonly gatewayService: GatewayService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async expirationDateCheck() {
    const today = new Date();
    const limitDate = new Date(today);
    limitDate.setDate(limitDate.getDate() + 30);

    const batch = await this.batchRepository.find({
      expiresAt: limitDate,
    });
    console.log(batch);

    if (batch.data.length > 0) {
      this.gatewayService.emitirVencimentos(batch.data);
    }
  }
}
