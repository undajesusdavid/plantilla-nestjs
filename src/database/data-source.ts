import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const baseConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: ['query', 'error'],
  entities: [
    'src/**/*.model.ts',
  ],
  migrations: [
    'src/database/migrations/*.ts',
  ],
  ssl: {
    rejectUnauthorized: false,
  },
};

export const AppDataSource = new DataSource(baseConfig);

// Initialize data source
AppDataSource.initialize().catch((err) => {
  console.error('Error during DataSource initialization:', err);
});
