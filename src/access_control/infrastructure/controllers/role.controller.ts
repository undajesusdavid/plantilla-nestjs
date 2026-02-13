import { Body, Controller, Delete, Inject,  Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/infrastructure/controllers/guards/jwt-auth.guard';
import { AccessGuard } from './guards/access.guard';
import { Permissions } from './decorators/permissions.decorator';
import { PERMISSIONS } from 'src/access_control/core/rules/Permission.seeds';

import { Role } from 'src/access_control/core/role/Role';
import { RoleDtoUpdate } from './dto_request/RoleDtoUpdate';
import { RoleDtoCreate } from './dto_request/RoleDtoCreate';
import { RoleDtoResponse } from './dto_response/RoleDtoResponse';

import { COMMAND_BUS, type CommandBus } from 'src/shared/app/bus/command-bus';
import { QUERY_BUS, type QueryBus } from 'src/shared/app/bus/query-bus';

import { CreateRoleCommand } from 'src/access_control/app/create-role/create-role.command';
import { DeleteRoleCommand } from 'src/access_control/app/delete-role/delete-role.command';
import { UpdateRoleCommand } from 'src/access_control/app/update-role/update-role.command';

@Controller('roles')
export class RoleController {

    constructor(
        @Inject(COMMAND_BUS) private readonly command: CommandBus,
        @Inject(QUERY_BUS) private readonly query: QueryBus,
    ) { }

    @Post('/create')
    @Permissions(PERMISSIONS.CREATE_ROLE.name)
    @UseGuards(JwtAuthGuard, AccessGuard)
    async create(@Body() dto: RoleDtoCreate): Promise<RoleDtoResponse> {
        const role = await this.command.execute<Role>(new CreateRoleCommand({
            name: dto.name,
            description: dto.description,
            permissions: dto.permissions,
        }));
        return new RoleDtoResponse(role);
    }

    @Put('/update/:id')
    @Permissions(PERMISSIONS.UPDATE_ROLE.name)
    @UseGuards(JwtAuthGuard, AccessGuard)
    async update(@Param('id') id: string, @Body() dto: RoleDtoUpdate): Promise<RoleDtoResponse> {
        const role = await this.command.execute<Role>(new UpdateRoleCommand({
            id,
            data: {
                name: dto.name,
                description: dto.description,
                isActive: dto.isActive,
                permissions: dto.permissions,
            }
        }));
        return new RoleDtoResponse(role);
    }

    @Delete('/delete/:id')
    @Permissions(PERMISSIONS.DELETE_ROLE.name)
    @UseGuards(JwtAuthGuard, AccessGuard)
    async delete(@Param('id') id: string): Promise<RoleDtoResponse> {
        const role = await this.command.execute<Role>(new DeleteRoleCommand({id}));
        return new RoleDtoResponse(role);
    }

}
