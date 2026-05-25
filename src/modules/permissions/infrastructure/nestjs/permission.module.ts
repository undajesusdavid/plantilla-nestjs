import { Inject, Module } from '@nestjs/common';

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

//PATRON BUS
import { NestCommandBus } from '@src/shared/infrastructure/framework/nest/module/bus/nest-command-bus';
import { NestQueryBus } from '@src/shared/infrastructure/framework/nest/module/bus/nest-query-bus';
import { NestBaseModule } from '@src/shared/infrastructure/framework/nest/module/nest-base-module';
import { COMMAND_BUS } from '@shared/app/bus/command-bus';
import { QUERY_BUS } from '@shared/app/bus/query-bus';


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
  constructor(
    @Inject(COMMAND_BUS) commandBus: NestCommandBus,
    @Inject(QUERY_BUS) queryBus: NestQueryBus,
  ) {
    super('Permissions', commandBus, queryBus, UseCasesProvider);
  }
}


