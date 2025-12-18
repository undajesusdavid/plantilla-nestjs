import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

//Models
import { PermissionModel } from './structure/models/permission.sequelize';
import { RoleModel } from './structure/models/role.sequelize';
import { RolePermissionModel } from './structure/models/role_permission.sequelize';
//Controllers
import { PermissionController } from './structure/controllers/permission.controller';
//Repositories
import { PermissionRepositoryToken } from './app/contracts/PermissionRepository';
import { PermissionRepositoryImp } from './structure/services/PermissionRepositoryImp';
import { RoleRepositoryToken } from './app/contracts/RoleRepository';
import { RoleRepositoryImp } from './structure/services/RoleRepositoryImp';
//Seeders
import { seedAccessControl } from './structure/console/seedAccessControl';


@Module({
  imports: [SequelizeModule.forFeature([PermissionModel, RoleModel, RolePermissionModel])],
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