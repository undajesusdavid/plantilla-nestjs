import { Inject, Logger, Module, OnModuleInit } from '@nestjs/common';

// CONTROLLERS
import { UserController } from '../controllers/user.controller';

// IMPORTS
import { SharedModule } from 'src/shared/infrastructure/context/shared.module';
import { PersistenceModels } from './imports/persistence-models.import';

// EXPORTS
import { ServiceExports } from './exports/service.exports';
import { UseCaseExports } from './exports/use-case.exports';

// PROVIDERS
import { ServicesProvider } from './providers/services.provider';
import { UseCasesProvider } from './providers/use-cases.provider';
import { MappersProvider } from './providers/mappers.provider';


//PATRON BUS
import { NestCommandBus } from 'src/shared/infrastructure/bus/nestjs-bus/nest-command-bus';
import { COMMAND_BUS } from 'src/shared/app/bus/command-bus';
import { NestQueryBus } from 'src/shared/infrastructure/bus/nestjs-bus/nest-query-bus';
import { QUERY_BUS } from 'src/shared/app/bus/query-bus';

// QUERYS, COMMANDS Y USE-CASES PARA EL PATRON BUS
import { GetUserQuery } from 'src/users/app/get-user/get-user.query';
import { GetUserUseCase } from 'src/users/app/get-user/get-user.use-case';
import { GetUsersQuery } from 'src/users/app/get-users/get-users.query';
import { GetUsersUseCase } from 'src/users/app/get-users/get-users.use-case';
import { AuthUserCommand } from 'src/users/app/auth-user/auth-user.command';
import { AuthUserUseCase } from 'src/users/app/auth-user/auth-user.use-case';
import { CreateUserCommand } from 'src/users/app/create-user/create-user.command';
import { CreateUserUseCase } from 'src/users/app/create-user/create-user.use-case';
import { UpdateUserCommand } from 'src/users/app/update-user/update-user.command';
import { UpdateUserUseCase } from 'src/users/app/update-user/update-user.use-case';
import { DeleteUserCommand } from 'src/users/app/delete-user/delete-user.command';
import { DeleteUserUseCase } from 'src/users/app/delete-user/delete-user.use-case';


@Module({
  imports: [
    SharedModule, 
    ...PersistenceModels
  ],
  controllers: [
    UserController
  ],
  providers: [
    ...ServicesProvider,
    ...UseCasesProvider,
    ...MappersProvider
  ],
  exports: [
    ...ServiceExports, 
    ...UseCaseExports
  ]
})
export class UserModule implements OnModuleInit {

  constructor(
    @Inject(COMMAND_BUS) private readonly commandBus: NestCommandBus,
    @Inject(QUERY_BUS) private readonly queryBus: NestQueryBus
  ) { }

  onModuleInit() {
    this.commandBusRegister();
    this.queryBusRegister();
    const logger = new Logger('Module');
    logger.log('Modulo usuarios inicializado');
  }


  commandBusRegister() {
    this.commandBus.register(AuthUserCommand, AuthUserUseCase);
    this.commandBus.register(CreateUserCommand, CreateUserUseCase);
    this.commandBus.register(UpdateUserCommand, UpdateUserUseCase);
    this.commandBus.register(DeleteUserCommand, DeleteUserUseCase);
  }

  queryBusRegister() {
    this.queryBus.register(GetUserQuery, GetUserUseCase);
    this.queryBus.register(GetUsersQuery, GetUsersUseCase);
  }
}