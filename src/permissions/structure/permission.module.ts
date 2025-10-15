import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionController } from './permission.controller';
import { PermissionRepositoryImp } from './services/PermissionRepositoryImp';

@Module({
  imports: [SequelizeModule.forFeature([PermissionModule])],
  controllers: [PermissionController],
  providers: [PermissionRepositoryImp]
})
export class PermissionModule {
    
}