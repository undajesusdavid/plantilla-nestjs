import { Logger, OnModuleInit } from '@nestjs/common';
import { NestCommandBus } from '../bus/nest-command-bus';
import { NestQueryBus } from '../bus/nest-query-bus';

//PATRON BUS
import { COMMAND_BUS } from '@shared/app/bus/command-bus';
import { QUERY_BUS } from '@shared/app/bus/query-bus';

export abstract class NestBaseModule implements OnModuleInit {
  protected readonly logger: Logger;
  constructor(
    protected readonly moduleName: string,
    protected readonly commandBus: NestCommandBus,
    protected readonly queryBus: NestQueryBus,
    protected readonly providers: any[] = [],
  ) {
    this.logger = new Logger(moduleName);
  }

  onModuleInit() {
    this.commandBus.autoRegister(this.providers);
    this.queryBus.autoRegister(this.providers);
    this.logger.log(`Módulo ${this.moduleName} inicializado`);
  }
}


