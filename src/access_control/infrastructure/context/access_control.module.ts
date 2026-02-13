import { Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import { AccessControlImports } from './imports';
import { AccessControlControllers } from './controllers';
import { Providers, ProvidersExport } from './providers';
//Modulos externos
import { SharedModule } from "src/shared/infrastructure/context/shared.module"
import { COMMAND_BUS } from 'src/shared/app/bus/command-bus';
import { QUERY_BUS } from 'src/shared/app/bus/query-bus';
import { NestCommandBus } from 'src/shared/infrastructure/bus/nestjs-bus/nest-command-bus';
import { NestQueryBus } from 'src/shared/infrastructure/bus/nestjs-bus/nest-query-bus';
import { CreateRoleCommand } from 'src/access_control/app/create-role/create-role.command';
import { CreateRoleUseCase } from 'src/access_control/app/create-role/create-role.use-case';
import { DeleteRoleCommand } from 'src/access_control/app/delete-role/delete-role.command';
import { DeleteRoleUseCase } from 'src/access_control/app/delete-role/delete-role.use-case';
import { UpdateRoleCommand } from 'src/access_control/app/update-role/update-role.command';
import { UpdateRoleUseCase } from 'src/access_control/app/update-role/update-role.use-case';

@Module({
  imports: [...AccessControlImports, SharedModule],
  controllers: [...AccessControlControllers],
  providers: [...Providers],
  exports: [...ProvidersExport],
})
export class AccessControlModule implements OnModuleInit {

  constructor(
    @Inject(COMMAND_BUS) private readonly commandBus: NestCommandBus,
    @Inject(QUERY_BUS) private readonly queryBus: NestQueryBus
  ) { }

  onModuleInit() {
    this.commandBusRegister();
    this.queryBusRegister();
    const logger = new Logger('Module');
    logger.log('Modulo de control de acceso inicializado');
  }


  commandBusRegister() {
    this.commandBus.register(CreateRoleCommand, CreateRoleUseCase);
    this.commandBus.register(DeleteRoleCommand, DeleteRoleUseCase);
    this.commandBus.register(UpdateRoleCommand, UpdateRoleUseCase);

  }

  queryBusRegister() {
    //this.queryBus.register(GetUserQuery, GetUserUseCase);

  }
}