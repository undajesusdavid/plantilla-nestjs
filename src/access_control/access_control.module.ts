import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionController } from './structure/permission.controller';
import { PermissionRepositoryToken } from './app/contracts/PermissionRepository';
import { PermissionRepositoryImp } from './structure/services/PermissionRepositoryImp';
import { PermissionModel } from './structure/permission.sequealize';
import { RoleModel } from './structure/role.sequealize';


@Module({
  imports: [SequelizeModule.forFeature([PermissionModel,RoleModel])],
  controllers: [PermissionController],
  providers: [{
    provide: PermissionRepositoryToken,
    useClass: PermissionRepositoryImp
  }],
  exports: [PermissionRepositoryToken],
})
export class AccessControlModule {

}