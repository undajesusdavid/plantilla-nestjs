// src/shared/infrastructure/framework/nest/shared.module.ts
import { Global, Module } from '@nestjs/common';
import { TypeOrmModuleConfig } from '@shared/infrastructure/persistence/typeorm/typeorm.config';
import { COMMAND_BUS } from '@src/shared/app/bus/command-bus';
import { NestCommandBus } from './module/bus/nest-command-bus';
import { QUERY_BUS } from '@src/shared/app/bus/query-bus';
import { NestQueryBus } from './module/bus/nest-query-bus';
import { UNIT_OF_WORK } from '@shared/core/interfaces/unit-of-work.interface';
import { TypeOrmUnitOfWork } from '@shared/infrastructure/persistence/typeorm/typeorm.unit-of.work';
import { UuidService } from '@src/shared/infrastructure/services/uuid.service';
import { UUID_SERVICE } from '@src/shared/core/interfaces/uuid-service.interface';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { EVENT_EMITTER } from '@src/shared/core/interfaces/events/event-emitter';
import { NestEventEmitter } from './module/event/nest-event-emitter';

@Global()
@Module({
  imports: [
    TypeOrmModuleConfig,
    EventEmitterModule.forRoot(),
  ],
  providers: [
    { provide: UNIT_OF_WORK, useClass: TypeOrmUnitOfWork },
    { provide: COMMAND_BUS, useClass: NestCommandBus },
    { provide: QUERY_BUS, useClass: NestQueryBus },
    {
      provide: EVENT_EMITTER,
      inject: [EventEmitter2],
      useFactory: (eventEmmiter: EventEmitter2) => new NestEventEmitter(eventEmmiter)
    },
    { provide: UUID_SERVICE, useClass: UuidService },

  ],
  exports: [UNIT_OF_WORK, UUID_SERVICE, COMMAND_BUS, QUERY_BUS, EVENT_EMITTER],
})
export class SharedModule { }


