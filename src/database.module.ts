import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        uri: config.get<string>('URI'),
        //host: config.get<string>('DB_HOST'),
        //port: parseInt(config.get<string>('DB_PORT') || '5432', 10),
        //username: config.get<string>('DB_USER'),
        //password: config.get<string>('DB_PASSWORD'),
        //database: config.get<string>('DB_NAME'),
        autoLoadModels: true,
        synchronize: true,

      }),
    }),
  ],
})
export class DatabaseModule { }
