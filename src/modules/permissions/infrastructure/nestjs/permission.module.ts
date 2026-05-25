import { Module } from '@nestjs/common';
import { NestBaseModule } from '@src/shared/infrastructure/framework/nest/module/nest-base-module';

//CONTROLLERS
import { PermissionController } from '@modules/permissions/infrastructure/nestjs/controllers/permission.controller';


import {
  //IMPORTS
  PersistenceModels,
  //EXPORTS
  ServiceExports,
  UseCaseExports,
  //PROVIDERS
  ServicesProvider,
  UseCasesProvider,
  MappersProvider

} from "./context";

@Module({
  imports: [
    ...PersistenceModels
  ],
  providers: [
    ...ServicesProvider, 
    ...UseCasesProvider, 
    ...MappersProvider
  ],
  controllers: [PermissionController],
  exports: [
    ...ServiceExports, 
    ...UseCaseExports
  ],
})
export class PermissionModule extends NestBaseModule {
  constructor() {
    super('Permissions', UseCasesProvider);
  }
}


