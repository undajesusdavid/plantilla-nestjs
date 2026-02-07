import { Module } from '@nestjs/common';
import { AccessControlModule } from './access_control/infrastructure/context/access_control.module';
import { UserModule } from './users/infrastructure/context/user.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/infrastructure/context/shared.module';


// Modulo de la aplicacion Global
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // hace que esté disponible en todos los módulos
    }),
    SharedModule,
    UserModule,
    AccessControlModule, 
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
