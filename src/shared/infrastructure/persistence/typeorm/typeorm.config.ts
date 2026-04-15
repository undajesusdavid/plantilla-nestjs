import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const TypeOrmModuleConfig = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
     const uri = configService.get<string>('URI');
     console.log('[TypeOrmConfig] URI found:', !!uri);
 
     return {
       type: 'postgres',
       url: uri,
       extra: {
         ssl: {
           rejectUnauthorized: false,
         },
       },
       ssl: {
         rejectUnauthorized: false,
       },
       autoLoadEntities: true,
       synchronize: configService.get<boolean>('DB_SYNC') === true, // ✅ Solo true en desarrollo
       logging: true,
       migrations: ['src/database/migrations/*.ts'],
       migrationsRun: configService.get<boolean>('RUN_MIGRATIONS') === true, // Auto-run en startup si es necesario
     };
   },
});
