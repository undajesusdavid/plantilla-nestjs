import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const baseConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: process.env.DB_SYNC === 'true',
  logging: ['query', 'error'],

  entities: [
    'dist/**/*.model.js',
    'src/**/*.model.ts',
  ],
  migrations: [
    'dist/database/migrations/*.js',
    'src/database/migrations/*.ts',
  ],
  migrationsTableName: 'sys_migrations',
  migrationsRun: false,
  ssl: {
    rejectUnauthorized: false,
  },
};

export const AppDataSource = new DataSource(baseConfig);


