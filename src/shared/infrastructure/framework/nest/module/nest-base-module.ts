import { Logger, OnModuleInit, Inject } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { NestCommandBus } from './bus/nest-command-bus';
import { NestQueryBus } from './bus/nest-query-bus';
import { COMMAND_BUS } from '@src/shared/app/bus/command-bus';
import { QUERY_BUS } from '@src/shared/app/bus/query-bus';
import { EVENT_EMITTER } from '@src/shared/core/interfaces/events/event-emitter';


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

      // Ejecuta la lógica de auto-registro pasándole los providers/use cases
      commandBus.autoRegister(this.providers);
      queryBus.autoRegister(this.providers);

      // Settear propiedades del BaseUseCase para que puedan emitir eventos
      this.providers.forEach((provider) => {
        const target = typeof provider === 'function' ? provider : provider.provide;
        if (!target) return;
        const useCase = this.moduleRef.get(target, { strict: false });
        if (useCase && typeof useCase.setEventEmitter === 'function') {
          const eventEmitter = this.moduleRef.get(EVENT_EMITTER, { strict: false });
          useCase.setEventEmitter(eventEmitter);
        }
      });

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