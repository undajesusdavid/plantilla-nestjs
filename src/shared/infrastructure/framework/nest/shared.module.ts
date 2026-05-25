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
import { UUID_SERVICE } from '@shared/core/interfaces/uuid-service.interface';
import { EVENT_BUS } from '@src/shared/app/bus/event-bus';
import { NestEventBus } from './module/bus/nest-event-bus';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Global()
@Module({
  imports: [
    TypeOrmModuleConfig,
    EventEmitterModule.forRoot({ wildcard: true }),
  ],
  providers: [
    { provide: UNIT_OF_WORK, useClass: TypeOrmUnitOfWork },
    { provide: COMMAND_BUS, useClass: NestCommandBus },
    { provide: QUERY_BUS, useClass: NestQueryBus },
    { provide: EVENT_BUS, useClass: NestEventBus },
    { provide: UUID_SERVICE, useClass: UuidService },
  ],
  exports: [UNIT_OF_WORK, UUID_SERVICE, COMMAND_BUS, QUERY_BUS, EVENT_BUS],
})
export class SharedModule {}


