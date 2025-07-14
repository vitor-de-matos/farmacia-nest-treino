import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  TypeOrmHealthIndicator,
  HealthCheckService,
  HealthCheck,
} from '@nestjs/terminus';

@Controller('health')
@UseGuards(AuthGuard('jwt'))
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([async () => this.db.pingCheck('postgres')]);
  }
}
