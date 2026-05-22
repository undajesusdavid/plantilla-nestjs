import { Inject, Module } from '@nestjs/common';

//CONTROLLERS
import { PermissionController } from '@modules/permissions/infrastructure/nestjs/controllers/permission.controller';

//IMPORTS
import { SharedModule } from '@shared/infrastructure/framework/nest/context/shared.module';
import { NestCommandBus } from '@shared/infrastructure/framework/nest/bus/nest-command-bus';
import { NestQueryBus } from '@shared/infrastructure/framework/nest/bus/nest-query-bus';
import { PersistenceModels } from './imports/persistence-models.import';
//EXPORTS
import { ServiceExports } from './exports/service.exports';
import { UseCaseExports } from './exports/use-case.exports';

//PROVIDERS
import { ServicesProvider } from './providers/services.provider';
import { UseCasesProvider } from './providers/use-cases.provider';
import { MappersProvider } from './providers/mappers.provider';
import { NestBaseModule } from '@src/shared/infrastructure/framework/nest/base/nest-base-module';
import { COMMAND_BUS } from '@shared/app/bus/command-bus';
import { QUERY_BUS } from '@shared/app/bus/query-bus';


@Module({
  imports: [SharedModule, ...PersistenceModels],
  controllers: [PermissionController],
  providers: [...ServicesProvider, ...UseCasesProvider, ...MappersProvider],
  exports: [...ServiceExports, ...UseCaseExports],
})
export class PermissionModule extends NestBaseModule {
  constructor(
    @Inject(COMMAND_BUS) commandBus: NestCommandBus,
    @Inject(QUERY_BUS) queryBus: NestQueryBus,
  ) {
    super('Permissions', commandBus, queryBus, UseCasesProvider);
  }
}


