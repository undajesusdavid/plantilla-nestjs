import { Inject, Module } from '@nestjs/common';

// CONTROLLERS
import { UserController } from '@modules/users/infrastructure/nestjs/controllers/user.controller';

// IMPORTS
import { SharedModule } from '@shared/infrastructure/framework/nest/context/shared.module';
import { PersistenceModels } from './imports/persistence-models.import';

// EXPORTS
import { PersistenceExport } from './exports/persistence.export';
import { ServiceExport } from './exports/service.export';
import { UseCaseExport } from './exports/use-case.export';

// PROVIDERS
import { PersistenceProvider } from './providers/persistence.provider';
import { ServiceProvider } from './providers/service.provider';
import { UseCaseProvider } from './providers/use-case.provider';


//PATRON BUS
import { NestCommandBus } from '@shared/infrastructure/framework/nest/bus/nest-command-bus';
import { COMMAND_BUS } from '@shared/app/bus/command-bus';
import { NestQueryBus } from '@shared/infrastructure/framework/nest/bus/nest-query-bus';
import { QUERY_BUS } from '@shared/app/bus/query-bus';

import { NestBaseModule } from '@src/shared/infrastructure/framework/nest/base/nest-base-module';



@Module({
  imports: [
    ...PersistenceModels
  ],
  controllers: [
    UserController
  ],
  providers: [
    ...ServiceProvider, 
    ...UseCaseProvider, 
    ...PersistenceProvider
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


