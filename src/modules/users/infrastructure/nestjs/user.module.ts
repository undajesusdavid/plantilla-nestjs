import { Module } from '@nestjs/common';
import { NestBaseModule } from '@src/shared/infrastructure/framework/nest/module/nest-base-module';

// CONTROLLERS
import { UserController } from './controllers/user.controller';
import { UserGateway } from './gateways/user.gateway';

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


@Module({
  imports: [
    ...PersistenceModels
  ],
  providers: [
    UserGateway,
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
  constructor() {
    super('Usuarios', [...UseCaseProvider]);
  }
}


