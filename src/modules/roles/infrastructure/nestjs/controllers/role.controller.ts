import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@shared/infrastructure/adapters/nest/security/guards/jwt-auth.guard';
import { AccessGuard } from '@shared/infrastructure/adapters/nest/security/guards/access.guard';
import { Permissions } from '@shared/infrastructure/adapters/nest/security/decorators/permissions.decorator';
import { PERMISSIONS } from '@modules/permissions/core/seeds/Permission.seeds';
// ENTIDAD DEL DOMINIO
import { Role } from '@modules/roles/core/entities/Role';
// DTOs request
import { UpdateRoleRequestDto } from '@modules/roles/infrastructure/nestjs/dto/update-role-request.dto';
import { CreateRoleRequestDto } from '@modules/roles/infrastructure/nestjs/dto/create-role-request.dto';
import { RoleResponseDto } from '@modules/roles/infrastructure/nestjs/dto/role-response.dto';
// PATRON BUS
import { COMMAND_BUS, type CommandBus } from '@shared/app/bus/command-bus';
import { QUERY_BUS, type QueryBus } from '@shared/app/bus/query-bus';
// COMMANDS
import { CreateRoleCommand } from '@modules/roles/app/create-role/create-role.command';
import { DeleteRoleCommand } from '@modules/roles/app/delete-role/delete-role.command';
import { UpdateRoleCommand } from '@modules/roles/app/update-role/update-role.command';

@Controller('roles')
export class RoleController {
  constructor(
    @Inject(COMMAND_BUS) private readonly command: CommandBus,
    @Inject(QUERY_BUS) private readonly query: QueryBus,
  ) {}

  @Post('/create')
  @Permissions(PERMISSIONS.CREATE_ROLE.name)
  @UseGuards(JwtAuthGuard, AccessGuard)
  async create(@Body() dto: CreateRoleRequestDto): Promise<RoleResponseDto> {
    const role = await this.command.execute<Role>(
      new CreateRoleCommand({
        name: dto.name,
        description: dto.description,
        permissions: dto.permissions,
      }),
    );
    return new RoleResponseDto(role);
  }

  @Put('/update/:id')
  @Permissions(PERMISSIONS.UPDATE_ROLE.name)
  @UseGuards(JwtAuthGuard, AccessGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRoleRequestDto,
  ): Promise<RoleResponseDto> {
    const role = await this.command.execute<Role>(
      new UpdateRoleCommand({
        id,
        data: {
          name: dto.name,
          description: dto.description,
          isActive: dto.isActive,
          permissions: dto.permissions,
        },
      }),
    );
    return new RoleResponseDto(role);
  }

  @Delete('/delete/:id')
  @Permissions(PERMISSIONS.DELETE_ROLE.name)
  @UseGuards(JwtAuthGuard, AccessGuard)
  async delete(@Param('id') id: string): Promise<RoleResponseDto> {
    const role = await this.command.execute<Role>(
      new DeleteRoleCommand({ id }),
    );
    return new RoleResponseDto(role);
  }
}


