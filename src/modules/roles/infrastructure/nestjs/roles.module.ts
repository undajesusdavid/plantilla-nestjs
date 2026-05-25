import { Inject, Module } from '@nestjs/common';

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

// PATRONES DE DISEÑO
import { COMMAND_BUS } from '@shared/app/bus/command-bus';
import { QUERY_BUS } from '@shared/app/bus/query-bus';
import { NestCommandBus } from '@src/shared/infrastructure/framework/nest/module/bus/nest-command-bus';
import { NestQueryBus } from '@src/shared/infrastructure/framework/nest/module/bus/nest-query-bus';


import { NestBaseModule } from '@src/shared/infrastructure/framework/nest/module/nest-base-module';

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
  constructor(
    @Inject(COMMAND_BUS) commandBus: NestCommandBus,
    @Inject(QUERY_BUS) queryBus: NestQueryBus,
  ) {
    super('Roles', commandBus, queryBus, UseCasesProvider);
  }
}


