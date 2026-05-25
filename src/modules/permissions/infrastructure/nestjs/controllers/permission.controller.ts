import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@shared/infrastructure/framework/nest/controller/guards/jwt-auth.guard';
import { AccessGuard } from '@shared/infrastructure/framework/nest/controller/guards/access.guard';
import { Permissions } from '@src/shared/infrastructure/framework/nest/controller/decorators/permissions.decorator';
import { PERMISSIONS } from '@modules/permissions/core/seeds/Permission.seeds';
import { PermissionResponseDto } from './dto/response/permission-response.dto';

// PATRON BUS
import { COMMAND_BUS, type CommandBus } from '@shared/app/bus/command-bus';
import { QUERY_BUS, type QueryBus } from '@shared/app/bus/query-bus';
import { Permission } from '@src/modules/permissions/core/entities/Permission';
import { GetPermissionsQuery } from '@src/modules/permissions/app/get-permissions/get-permissions.query';

@Controller('permissions')
export class PermissionController {
  constructor(
    @Inject(COMMAND_BUS) private readonly command: CommandBus,
    @Inject(QUERY_BUS) private readonly query: QueryBus
  ) { }

  @Get()
  @Permissions(PERMISSIONS.READ_PERMISSIONS.name)
  @UseGuards(JwtAuthGuard, AccessGuard)
  async getAll(): Promise<PermissionResponseDto[]> {
    const permissions = await this.query.execute<Permission[]>(new GetPermissionsQuery());
    return permissions.map((perm) => new PermissionResponseDto(perm));
  }

}

