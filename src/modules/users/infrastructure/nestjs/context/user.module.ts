import { Inject, Module } from '@nestjs/common';

// CONTROLLERS
import { UserController } from '@modules/users/infrastructure/nestjs/controllers/user.controller';

// IMPORTS
import { SharedModule } from '@shared/infrastructure/adapters/nest/context/shared.module';
import { PersistenceModels } from './imports/persistence-models.import';

// EXPORTS
import { ServiceExports } from './exports/service.exports';
import { UseCaseExports } from './exports/use-case.exports';

// PROVIDERS
import { ServicesProvider } from './providers/services.provider';
import { UseCasesProvider } from './providers/use-cases.provider';
import { MappersProvider } from './providers/mappers.provider';

//PATRON BUS
import { NestCommandBus } from '@shared/infrastructure/adapters/nest/bus/nest-command-bus';
import { COMMAND_BUS } from '@shared/app/bus/command-bus';
import { NestQueryBus } from '@shared/infrastructure/adapters/nest/bus/nest-query-bus';
import { QUERY_BUS } from '@shared/app/bus/query-bus';

import { NestBaseModule } from '@src/shared/infrastructure/adapters/nest/base/nest-base-module';

@Module({
  imports: [SharedModule, ...PersistenceModels],
  controllers: [UserController],
  providers: [...ServicesProvider, ...UseCasesProvider, ...MappersProvider],
  exports: [...ServiceExports, ...UseCaseExports],
})
export class UserModule extends NestBaseModule {
  constructor(
    @Inject(COMMAND_BUS) commandBus: NestCommandBus,
    @Inject(QUERY_BUS) queryBus: NestQueryBus,
  ) {
    super('Usuarios', commandBus, queryBus, UseCasesProvider);
  }
}


