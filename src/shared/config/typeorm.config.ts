import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_PG_HOST,
  port: parseInt(process.env.DB_PG_PORT),
  username: process.env.DB_PG_USERNAME,
  password: process.env.DB_PG_PASSWORD,
  database: process.env.DB_PG_DATABASE,
  schema: process.env.DB_PG_SCHEMA,
  synchronize: false,
  logging: false,
  entities: [__dirname + '/../../**/*.entity.{ts,js}'],
});
