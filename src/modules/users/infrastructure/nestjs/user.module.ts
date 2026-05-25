import { Inject, Module } from '@nestjs/common';

// CONTROLLERS
import { UserController } from '@modules/users/infrastructure/nestjs/controllers/user.controller';


import {
  // IMPORTS
  PersistenceModels,
  // EXPORTS
  PersistenceExport,
  ServiceExport,
  UseCaseExport,
  // PROVIDERS
  PersistenceProvider,
  ServiceProvider,
  UseCaseProvider,

} from "./context";


//PATRON BUS
import { NestCommandBus } from '@src/shared/infrastructure/framework/nest/module/bus/nest-command-bus';
import { COMMAND_BUS } from '@shared/app/bus/command-bus';
import { NestQueryBus } from '@src/shared/infrastructure/framework/nest/module/bus/nest-query-bus';
import { QUERY_BUS } from '@shared/app/bus/query-bus';

import { NestBaseModule } from '@src/shared/infrastructure/framework/nest/module/nest-base-module';



@Module({
  imports: [
    ...PersistenceModels
  ],
  providers: [
    ...ServiceProvider, 
    ...UseCaseProvider, 
    ...PersistenceProvider
  ],
  controllers: [
    UserController
  ],
  exports: [
    ...ServiceExport, 
    ...UseCaseExport, 
    ...PersistenceExport
  ],
})
export class UserModule extends NestBaseModule {
  constructor(
    @Inject(COMMAND_BUS) commandBus: NestCommandBus,
    @Inject(QUERY_BUS) queryBus: NestQueryBus,
  ) {
    super('Usuarios', commandBus, queryBus, [...UseCaseProvider]);
  }
}


