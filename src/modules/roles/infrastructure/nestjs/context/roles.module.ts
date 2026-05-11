import { Inject, Module } from '@nestjs/common';

//CONTROLLERS
import { RoleController } from '@modules/roles/infrastructure/nestjs/controllers/role.controller';

//IMPORTS

import { SharedModule } from '@shared/infrastructure/adapters/nest/context/shared.module';
import { PermissionModule } from '@modules/permissions/infrastructure/nestjs/context/permission.module';
import { PersistenceModels } from './imports/persistence-models.import';

//EXPORTS
import { ServiceExports } from './exports/service.exports';
import { UseCaseExports } from './exports/use-case.exports';

//PROVIDERS
import { ServicesProvider } from './providers/services.provider';
import { UseCasesProvider } from './providers/use-cases.provider';
import { MappersProvider } from './providers/mappers.provider';

// PATRONES DE DISEÑO
import { COMMAND_BUS } from '@shared/app/bus/command-bus';
import { QUERY_BUS } from '@shared/app/bus/query-bus';
import { NestCommandBus } from '@shared/infrastructure/adapters/nest/bus/nest-command-bus';
import { NestQueryBus } from '@shared/infrastructure/adapters/nest/bus/nest-query-bus';


import { NestBaseModule } from '@shared/infrastructure/adapters/nest/bus/base-module';

@Module({
  imports: [SharedModule, PermissionModule, ...PersistenceModels],
  controllers: [RoleController],
  providers: [...ServicesProvider, ...UseCasesProvider, ...MappersProvider],
  exports: [...ServiceExports, ...UseCaseExports],
})
export class RolesModule extends NestBaseModule {
  constructor(
    @Inject(COMMAND_BUS) commandBus: NestCommandBus,
    @Inject(QUERY_BUS) queryBus: NestQueryBus,
  ) {
    super('Roles', commandBus, queryBus, UseCasesProvider);
  }
}


