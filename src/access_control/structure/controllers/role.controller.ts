import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/structure/controllers/guards/jwt-auth.guard';
import { AccessGuard } from './guards/access.guard';
import { Permissions } from './decorators/permissions.decorator';
import { PERMISSIONS } from 'src/access_control/core/Permission.seeds';


@Controller('roles')
export class RoleController {
    
    constructor(){ }

    @Post('/create')
    @Permissions(PERMISSIONS.CREATE_ROLE.name)
    @UseGuards(JwtAuthGuard, AccessGuard)
    createRole(@Body() createRoleDto: any) {
       console.log('Creating role with data:', createRoleDto);
    }

}
