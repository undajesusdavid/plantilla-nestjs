import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionController } from './permission.controller';
import { PermissionRepositoryImp } from './services/PermissionRepositoryImp';
import { PermissionModel } from './permission.sequealize';

@Module({
  imports: [SequelizeModule.forFeature([PermissionModel])],
  controllers: [PermissionController],
  providers: [PermissionRepositoryImp]
})
export class PermissionModule {
    
}