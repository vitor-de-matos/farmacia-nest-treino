import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const DB_PG_DATABASE = process.env.DB_PG_DATABASE;
export const DB_PG_SCHEMA = process.env.DB_PG_SCHEMA;

export const typeOrmConfigPostgres = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  name: configService.get<string>('dbPostgresDatabase'),
  host: configService.get<string>('dbPostgresHost'),
  port: configService.get<number>('dbPostgresPort'),
  username: configService.get<string>('dbPostgresUsername'),
  password: configService.get<string>('dbPostgresPassword'),
  database: configService.get<string>('dbPostgresDatabase'),
  entities: [__dirname + './../../../**/*.entity.{js,ts}'],
  synchronize: true,
  autoLoadEntities: true,
});
