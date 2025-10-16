import { Module } from '@nestjs/common';
import { PermissionModule } from './permissions/structure/permission.module';
import { RoleModule } from './roles/structure/role.module';
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
    PermissionModule, 
    RoleModule, 
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
