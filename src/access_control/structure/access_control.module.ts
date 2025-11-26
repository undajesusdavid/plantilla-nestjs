import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionController } from './permission.controller';
import { PermissionRepositoryToken } from '../app/contracts/PermissionRepository';
import { PermissionRepositoryImp } from './services/PermissionRepositoryImp';
import { PermissionModel } from './permission.sequealize';
import { RoleModel } from './role.sequealize';


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