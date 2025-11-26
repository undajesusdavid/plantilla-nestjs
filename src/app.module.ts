import { Module } from '@nestjs/common';
import { AccessControlModule } from './access_control/structure/access_control.module';
import { UserModule } from './users/structure/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';


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
