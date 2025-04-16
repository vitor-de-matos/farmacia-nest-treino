export const config = () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  pathToPublicStorage: process.env.PATH_TO_PUBLIC_STORAGE,
  production: process.env.PRODUCTION,
  dbPostgresHost: process.env.DB_PG_HOST,
  dbPostgresPort: process.env.DB_PG_PORT,
  dbPostgresUsername: process.env.DB_PG_USERNAME,
  dbPostgresPassword: process.env.DB_PG_PASSWORD,
  dbPostgresDatabase: process.env.DB_PG_DATABASE,
});
