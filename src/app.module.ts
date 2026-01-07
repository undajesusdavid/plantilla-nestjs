import { Module } from '@nestjs/common';
import { AccessControlModule } from './access_control/structure/context/access_control.module';
import { UserModule } from './users/structure/context/user.module';
import { ConfigModule } from '@nestjs/config';

import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';

// Modulo de base de datos
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


// Modulo de la aplicacion Global
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // hace que esté disponible en todos los módulos
    }),
    DatabaseModule,
    UserModule,
    AccessControlModule, 
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
