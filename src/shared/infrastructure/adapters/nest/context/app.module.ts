import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared.module';
import { UserModule } from '@modules/users/infrastructure/nestjs/context/user.module';
import { RolesModule } from '@modules/roles/infrastructure/nestjs/context/roles.module';
import { PermissionModule } from '@modules/permissions/infrastructure/nestjs/context/permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SharedModule,
    UserModule,
    RolesModule,
    PermissionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}


