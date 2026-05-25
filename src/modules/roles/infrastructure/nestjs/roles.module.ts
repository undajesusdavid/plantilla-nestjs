import { Module } from '@nestjs/common';
import { NestBaseModule } from '@src/shared/infrastructure/framework/nest/module/nest-base-module';

//CONTROLLERS
import { RoleController } from './controllers/role.controller';

import {
  //IMPORTS
  PermissionModule,
  PersistenceModels,
  //EXPORTS
  ServiceExports,
  UseCaseExports,
  //PROVIDERS
  ServicesProvider,
  UseCasesProvider,
  MappersProvider,

} from "./context";

@Module({
  imports: [
    PermissionModule, 
    ...PersistenceModels
  ],
  
  providers: [
    ...ServicesProvider, 
    ...UseCasesProvider, 
    ...MappersProvider
  ],
  controllers: [RoleController],
  exports: [
    ...ServiceExports, 
    ...UseCaseExports
  ],
})
export class RolesModule extends NestBaseModule {
  constructor() {
    super('Roles', UseCasesProvider);
  }
}


