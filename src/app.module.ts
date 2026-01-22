import { Module } from '@nestjs/common';
import { AccessControlModule } from './access_control/structure/context/access_control.module';
import { UserModule } from './users/structure/context/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/structure/context/sequealize.module';



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
