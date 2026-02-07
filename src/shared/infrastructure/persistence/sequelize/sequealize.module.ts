import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as cls from 'cls-hooked';
import { Sequelize } from 'sequelize-typescript';

export const SequealizeModule = SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
        // 1. Crear el namespace
        const namespace = cls.createNamespace('nestjs-sequelize-transaction');
        // 2. Decirle a Sequelize que lo use
        (Sequelize as any).useCLS(namespace);
        return {
            dialect: 'postgres',
            uri: config.get<string>('URI'),
            //host: config.get<string>('DB_HOST'),
            //port: parseInt(config.get<string>('DB_PORT') || '5432', 10),
            //username: config.get<string>('DB_USER'),
            //password: config.get<string>('DB_PASSWORD'),
            //database: config.get<string>('DB_NAME'),
            autoLoadModels: true,
            synchronize: true,
        }
    },
})