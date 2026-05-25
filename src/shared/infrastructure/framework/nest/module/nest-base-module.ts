import { Logger, OnModuleInit, Inject } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { NestCommandBus } from './bus/nest-command-bus';
import { NestQueryBus } from './bus/nest-query-bus';
import { COMMAND_BUS } from '@src/shared/app/bus/command-bus';
import { QUERY_BUS } from '@src/shared/app/bus/query-bus';
import { NestEventBus } from './bus/nest-event-bus';
import { EVENT_BUS } from '@src/shared/app/bus/event-bus';

export abstract class NestBaseModule implements OnModuleInit {
  protected readonly logger: Logger;
  
  // Inyecta el ModuleRef del módulo hijo que extienda esta clase
  @Inject()
  protected readonly moduleRef!: ModuleRef;

  constructor(
    protected readonly moduleName: string,
    protected readonly providers: any[] = [],
  ) {
    this.logger = new Logger(moduleName);
  }

  async onModuleInit() {
    try {
      // CRUCIAL: { strict: false } para buscar en el SharedModule @Global()
      const commandBus = this.moduleRef.get<NestCommandBus>(COMMAND_BUS, { strict: false });
      const queryBus = this.moduleRef.get<NestQueryBus>(QUERY_BUS, { strict: false });
      const eventBus = this.moduleRef.get<NestEventBus>(EVENT_BUS, { strict: false });

      // Ejecuta la lógica de auto-registro pasándole los providers/use cases
      commandBus.autoRegister(this.providers);
      queryBus.autoRegister(this.providers);

      // Eventos
      if (typeof (eventBus as any).autoRegister === 'function') {
        (eventBus as any).autoRegister(this.providers);
      }
      
      this.logger.log(`Módulo [${this.moduleName}] e infraestructura de Buses inicializados.`);
    } catch (error) {
      this.logger.error(
        `Error crítico al inicializar Buses en el módulo [${this.moduleName}]. ` +
        `Asegúrate de que SharedModule esté cargado en el AppModule.`,
        error
      );
    }
  }
}