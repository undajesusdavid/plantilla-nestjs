
import { TypeOrmModule } from '@nestjs/typeorm';


// src/shared/infrastructure/persistence/typeorm/typeorm-config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            url: this.configService.get<string>('URI'),
            //host: this.configService.get<string>('DB_HOST'),
            //port: this.configService.get<number>('DB_PORT'),
            //username: this.configService.get<string>('DB_USERNAME'),
            //password: this.configService.get<string>('DB_PASSWORD'),
            //database: this.configService.get<string>('DB_NAME'),
            // Cargará automáticamente todas las entidades que terminen en .orm-entity.ts
            autoLoadEntities: true,
            synchronize: this.configService.get<boolean>('DB_SYNC'),
            logging: true,
        };
    }
}

export const TypeOrmModuleConfig = TypeOrmModule.forRootAsync({
    useClass: TypeOrmConfigService,
})