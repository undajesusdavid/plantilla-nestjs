import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/structure/controllers/guards/jwt-auth.guard';
import { AccessGuard } from './guards/access.guard';
import { Permissions } from './decorators/permissions.decorator';
import { PERMISSIONS } from 'src/access_control/core/rules/Permission.seeds';
import { CreateRoleDtoRequest, CreateRoleDtoResponse } from './dto/CreateRoleDto';


@Controller('roles')
export class RoleController {
    
    constructor(){ }

    @Post('/create')
    @Permissions(PERMISSIONS.CREATE_ROLE.name)
    @UseGuards(JwtAuthGuard, AccessGuard)
    async createRole(@Body() dto: CreateRoleDtoRequest): Promise<void> {
       console.log('Creating role with data:', dto);
    }

}
