import { Module } from '@nestjs/common';
import { NestBaseModule } from '@src/shared/infrastructure/framework/nest/module/nest-base-module';

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
  constructor() {
    super('Usuarios', [...UseCaseProvider]);
  }
}


