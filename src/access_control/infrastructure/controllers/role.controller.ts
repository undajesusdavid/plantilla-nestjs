import { BadRequestException, Body, Controller, Delete, Inject, InternalServerErrorException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/infrastructure/controllers/guards/jwt-auth.guard';
import { AccessGuard } from './guards/access.guard';
import { Permissions } from './decorators/permissions.decorator';
import { PERMISSIONS } from 'src/access_control/core/rules/Permission.seeds';
import { RoleDtoCreate } from './dto_request/RoleDtoCreate';
import { RoleDtoResponse } from './dto_response/RoleDtoResponse';
import { ErrorUseCase } from 'src/shared/app/errors/ErrorUseCase';


import { RoleDtoUpdate } from './dto_request/RoleDtoUpdate';
// Create Role
import { CREATE_ROLE } from 'src/access_control/app/create-role/create-role.constants';
import { CreateRoleUseCase } from 'src/access_control/app/create-role/create-role.use-case';
// Delete Role
import { DELETE_ROLE } from 'src/access_control/app/delete-role/delete-role.constants';
import { DeleteRoleUseCase } from 'src/access_control/app/delete-role/delete-role.use-case';
// Update Role
import { UPDATE_ROLE } from 'src/access_control/app/role-update/update-role.constants';
import { UpdateRoleUseCase } from 'src/access_control/app/role-update/update-role.use-case';





@Controller('roles')
export class RoleController {

    constructor(
        @Inject(CREATE_ROLE) private readonly createRole: CreateRoleUseCase,
        @Inject(UPDATE_ROLE) private readonly updateRole: UpdateRoleUseCase,
        @Inject(DELETE_ROLE) private readonly deleteRole: DeleteRoleUseCase,
    ) { }

    @Post('/create')
    @Permissions(PERMISSIONS.CREATE_ROLE.name)
    @UseGuards(JwtAuthGuard, AccessGuard)
    async create(@Body() dto: RoleDtoCreate): Promise<RoleDtoResponse> {
        try {
            const role = await this.createRole.execute(dto);
            return new RoleDtoResponse(role);
        } catch (error) {
            if (error instanceof ErrorUseCase) {
                throw new InternalServerErrorException(error.message, error.code);
            }
            throw new BadRequestException(error.message);
        }
    }

    @Put('/update/:id')
    @Permissions(PERMISSIONS.UPDATE_ROLE.name)
    @UseGuards(JwtAuthGuard, AccessGuard)
    async update(@Param('id') id: string, @Body() dto: RoleDtoUpdate): Promise<RoleDtoResponse> {
        try {
            const role = await this.updateRole.execute({id, data:dto});
            return new RoleDtoResponse(role);
        } catch (error) {
            if (error instanceof ErrorUseCase) {
                throw new InternalServerErrorException(error.message, error.code);
            }
            throw new BadRequestException(error.message);
        }
    }

    @Delete('/delete/:id')
    @Permissions(PERMISSIONS.DELETE_ROLE.name)
    @UseGuards(JwtAuthGuard, AccessGuard)
    async delete(@Param('id') id: string): Promise<RoleDtoResponse> {
        try {
            const role = await this.deleteRole.execute(id);
            return new RoleDtoResponse(role);
        } catch (error) {
            if (error instanceof ErrorUseCase) {
                throw new BadRequestException(error.message);
            }
            throw new InternalServerErrorException(error.message, error.code);
        }
    }

}
