import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArchivesManagementJob } from './job/images-vids/archives-management.job';
import { typeOrmConfigPostgres } from './database/typeOrm/postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeOrmConfigPostgres,
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [ArchivesManagementJob],
  exports: [ArchivesManagementJob],
})
export class SharedModule {}
