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

// QUERYS, COMMANDS Y USE-CASES PARA EL PATRON BUS
import { GetUserQuery } from '@modules/users/app/get-user/get-user.query';
import { GetUserUseCase } from '@modules/users/app/get-user/get-user.use-case';
import { GetUsersQuery } from '@modules/users/app/get-users/get-users.query';
import { GetUsersUseCase } from '@modules/users/app/get-users/get-users.use-case';
import { AuthUserCommand } from '@modules/users/app/auth-user/auth-user.command';
import { AuthUserUseCase } from '@modules/users/app/auth-user/auth-user.use-case';
import { CreateUserCommand } from '@modules/users/app/create-user/create-user.command';
import { CreateUserUseCase } from '@modules/users/app/create-user/create-user.use-case';
import { UpdateUserCommand } from '@modules/users/app/update-user/update-user.command';
import { UpdateUserUseCase } from '@modules/users/app/update-user/update-user.use-case';
import { DeleteUserCommand } from '@modules/users/app/delete-user/delete-user.command';
import { DeleteUserUseCase } from '@modules/users/app/delete-user/delete-user.use-case';
import { NestBaseModule } from '@shared/infrastructure/adapters/nest/bus/base-module';

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

  protected registerCommands() {
    // Los comandos se registran automáticamente mediante el decorador @CommandHandler
  }

  protected registerQueries() {
    // Las consultas se registran automáticamente mediante el decorador @QueryHandler
  }
}


