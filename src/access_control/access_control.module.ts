import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionController } from './structure/controllers/permission.controller';
import { PermissionRepositoryToken } from './app/contracts/PermissionRepository';
import { PermissionRepositoryImp } from './structure/services/PermissionRepositoryImp';
import { PermissionModel } from './structure/models/permission.sequelize';
import { RoleRepositoryToken } from './app/contracts/RoleRepository';
import { RoleRepositoryImp } from './structure/services/RoleRepositoryImp';
import { RoleModel } from './structure/models/role.sequelize';
import { seedAccessControl } from './structure/console/seed/seedAccessControl';

@Module({
  imports: [SequelizeModule.forFeature([PermissionModel, RoleModel])],
  controllers: [PermissionController],
  providers: [
    {
      provide: PermissionRepositoryToken,
      useClass: PermissionRepositoryImp
    },
    {
    provide: RoleRepositoryToken,
    useClass: RoleRepositoryImp
    },
    {
      provide: 'seedAccessControl',
      useValue: seedAccessControl
    }
  ],
  exports: [PermissionRepositoryToken, RoleRepositoryToken, 'seedAccessControl'],
})
export class AccessControlModule {

}