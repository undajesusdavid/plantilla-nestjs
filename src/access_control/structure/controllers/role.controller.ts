import { BadRequestException, Body, Controller, Delete, Inject, InternalServerErrorException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/structure/controllers/guards/jwt-auth.guard';
import { AccessGuard } from './guards/access.guard';
import { Permissions } from './decorators/permissions.decorator';
import { PERMISSIONS } from 'src/access_control/core/rules/Permission.seeds';
import { RoleDtoCreate } from './dto_request/RoleDtoCreate';
import { RoleDtoResponse } from './dto_response/RoleDtoResponse';
import { ErrorUseCase } from 'src/shared/app/errors/ErrorUseCase';
import { type CreateRole, CreateRoleToken } from 'src/access_control/app/role-create/CreateRole';
import { type UpdateRole, UpdateRoleToken } from 'src/access_control/app/role-update/UpdateRole';
import { RoleDtoUpdate } from './dto_request/RoleDtoUpdate';


@Controller('roles')
export class RoleController {

    constructor(
        @Inject(CreateRoleToken) private readonly createRole: CreateRole,
        @Inject(UpdateRoleToken) private readonly updateRole: UpdateRole,
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
            const role = await this.updateRole.execute(id,dto);
            return new RoleDtoResponse(role);
        } catch (error) {
            if (error instanceof ErrorUseCase) {
                throw new InternalServerErrorException(error.message, error.code);
            }
            throw new BadRequestException(error.message);
        }
    }

}
