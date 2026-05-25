import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@src/shared/infrastructure/framework/nest/shared.module';
import { UserModule } from '@modules/users/infrastructure/nestjs/user.module';
import { RolesModule } from '@src/modules/roles/infrastructure/nestjs/roles.module';
import { PermissionModule } from '@src/modules/permissions/infrastructure/nestjs/permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SharedModule, // global
    UserModule,
    RolesModule,
    PermissionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}