import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArchivesManagementJob } from './job/images-vids/archives-management.job';
import { typeOrmConfigPostgres } from './database/typeOrm/postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ExpirationJob } from './job/expiration-date/expiration-date.job';
import { GatewayService } from './job/expiration-date/expiration-date.gateway';
import { BatchModule } from 'src/batch/batch.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeOrmConfigPostgres,
      inject: [ConfigService],
    }),
    BatchModule,
  ],
  controllers: [],
  providers: [ArchivesManagementJob, ExpirationJob, GatewayService],
  exports: [ArchivesManagementJob, ExpirationJob, GatewayService],
})
export class SharedModule {}
