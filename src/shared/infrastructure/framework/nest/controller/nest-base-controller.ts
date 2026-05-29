import { Inject } from '@nestjs/common';
import { COMMAND_BUS, type CommandBus } from '@shared/app/bus/command-bus';
import { QUERY_BUS, type QueryBus } from '@shared/app/bus/query-bus';

export abstract class NestBaseController {
  @Inject(COMMAND_BUS)
  protected readonly commandBus!: CommandBus;

  @Inject(QUERY_BUS)
  protected readonly queryBus!: QueryBus;
}