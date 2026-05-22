import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@shared/infrastructure/framework/nest/security/guards/jwt-auth.guard';
import { AccessGuard } from '@shared/infrastructure/framework/nest/security/guards/access.guard';
import { Permissions } from '@shared/infrastructure/framework/nest/security/decorators/permissions.decorator';
import { PERMISSIONS } from '@modules/permissions/core/seeds/Permission.seeds';
// ENTIDAD DEL DOMINIO
import { Role } from '@modules/roles/core/entities/Role';
// DTOs request
import { UpdateRoleRequestDto } from '@src/modules/roles/infrastructure/nestjs/dto/request/update-role-request.dto';
import { CreateRoleRequestDto } from '@src/modules/roles/infrastructure/nestjs/dto/request/create-role-request.dto';
import { RoleResponseDto } from '@src/modules/roles/infrastructure/nestjs/dto/response/role-response.dto';
// PATRON BUS
import { COMMAND_BUS, type CommandBus } from '@shared/app/bus/command-bus';
import { QUERY_BUS, type QueryBus } from '@shared/app/bus/query-bus';
// COMMANDS
import { CreateRoleCommand } from '@modules/roles/app/create-role/create-role.command';
import { DeleteRoleCommand } from '@modules/roles/app/delete-role/delete-role.command';
import { UpdateRoleCommand } from '@modules/roles/app/update-role/update-role.command';
import { GetRolesQuery } from '@src/modules/roles/app/get-roles/get-roles.query';
import { GetRoleQuery } from '@src/modules/roles/app/get-role/get-role.query';

@Controller('roles')
export class RoleController {
  constructor(
    @Inject(COMMAND_BUS) private readonly command: CommandBus,
    @Inject(QUERY_BUS) private readonly query: QueryBus,
  ) { }


  @Get()
  @Permissions(PERMISSIONS.READ_ROLES.name)
  @UseGuards(JwtAuthGuard, AccessGuard)
  async getAll(): Promise<RoleResponseDto[]> {
    const roles = await this.query.execute<Role[]>(new GetRolesQuery());
    return roles.map((role) => new RoleResponseDto(role));
  }

  @Get(':id')
  @Permissions(PERMISSIONS.READ_ROLES.name)
  @UseGuards(JwtAuthGuard, AccessGuard)
  async getOne(
    @Param('id') id: string,
  ): Promise<RoleResponseDto> {
    const role = await this.query.execute<Role>(new GetRoleQuery(id));
    return new RoleResponseDto(role);
  }

  @Post('/create')
  @Permissions(PERMISSIONS.CREATE_ROLE.name)
  @UseGuards(JwtAuthGuard, AccessGuard)
  async create(@Body() dto: CreateRoleRequestDto): Promise<RoleResponseDto> {
    const role = await this.command.execute<Role>(
      new CreateRoleCommand({
        name: dto.name,
        description: dto.description,
        isActive: dto.isActive,
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


