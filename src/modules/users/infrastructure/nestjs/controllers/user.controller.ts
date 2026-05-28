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

// Shared
import { PERMISSIONS } from '@shared/core/constants';
import { JwtAuthGuard, AccessGuard } from '@shared/infrastructure/framework/nest/controller/guards';
import { Permissions, CurrentUser } from '@shared/infrastructure/framework/nest/controller/decorators';
import { COMMAND_BUS, type CommandBus } from '@shared/app/bus/command-bus';
import { QUERY_BUS, type QueryBus } from '@shared/app/bus/query-bus';


import { User } from '@modules/users/core/entities/User';
import { AuthUserResponse } from '@modules/users/app/auth-user/auth-user.response';
import { MyPermissionsResponse } from '@modules/users/app/get-my-permissions/get-my-permissions.use-case';


import {
    //Queries
    GetUserQuery,
    GetUsersQuery,
    GetMyPermissionsQuery,
    //Commands
    AuthUserCommand,
    CreateUserCommand,
    DeleteUserCommand,
    UpdateUserCommand,
    UpdateUserRolesCommand
} from '@modules/users/app';

import {
    //Request
    CreateUserRequestDto,
    UpdateUserRequestDto,
    UpdateUserRolesRequestDto,
    AuthUserRequestDto,
    //Response
    UserResponseDto, 
    AuthResponseDto 
} from './dto';

// PIPES
import { UserIdPipe } from './pipes/user-id.pipe';

@Controller('users')
export class UserController {
    constructor(
        @Inject(COMMAND_BUS) private readonly command: CommandBus,
        @Inject(QUERY_BUS) private readonly query: QueryBus,
    ) { }

    @Post('/login')
    async login(@Body() dto: AuthUserRequestDto): Promise<AuthResponseDto> {
        const authUser = await this.command.execute<AuthUserResponse>(
            new AuthUserCommand(dto.username, dto.password),
        );
        return new AuthResponseDto(authUser);
    }

    @Get('/me/permissions')
    @UseGuards(JwtAuthGuard)
    async getMyPermissions( @CurrentUser() userId: string): Promise<MyPermissionsResponse> {
        return await this.query.execute<MyPermissionsResponse>(
            new GetMyPermissionsQuery(userId),
        );
    }

    @Get()
    @Permissions(PERMISSIONS.READ_USERS.name)
    @UseGuards(JwtAuthGuard, AccessGuard)
    async getAll(): Promise<UserResponseDto[]> {
        const users = await this.query.execute<User[]>(new GetUsersQuery());
        return users.map((user) => new UserResponseDto(user));
    }

    @Get()
    @Permissions(PERMISSIONS.READ_USERS.name)
    @UseGuards(JwtAuthGuard, AccessGuard)
    async getWithPagination(): Promise<UserResponseDto[]> {
        const users = await this.query.execute<User[]>(new GetUsersQuery());
        return users.map((user) => new UserResponseDto(user));
    }

    @Get(':id')
    @Permissions(PERMISSIONS.READ_USERS.name)
    @UseGuards(JwtAuthGuard, AccessGuard)
    async getOne(@Param('id', UserIdPipe) id: string): Promise<UserResponseDto> {
        const user = await this.query.execute<User>(new GetUserQuery(id));
        return new UserResponseDto(user);
    }

    @Post('/create')
    @Permissions(PERMISSIONS.CREATE_USER.name)
    @UseGuards(JwtAuthGuard, AccessGuard)
    async register(
        @Body() dto: CreateUserRequestDto,
    ): Promise<UserResponseDto> {
        const user = await this.command.execute<User>(
            new CreateUserCommand(dto.username, dto.password, dto.email, dto.active),
        );
        return new UserResponseDto(user);
    }

    @Put('update/:id')
    @Permissions(PERMISSIONS.UPDATE_USER.name)
    @UseGuards(JwtAuthGuard, AccessGuard)
    async update(
        @Param('id', UserIdPipe) id: string,
        @Body() dto: UpdateUserRequestDto,
    ): Promise<UserResponseDto> {
        const user = await this.command.execute<User>(
            new UpdateUserCommand({
                id: id,
                data: {
                    username: dto.username,
                    email: dto.email,
                    active: dto.active,
                },
            }),
        );
        return new UserResponseDto(user);
    }

    @Delete('delete/:id')
    @Permissions(PERMISSIONS.DELETE_USER.name)
    @UseGuards(JwtAuthGuard, AccessGuard)
    async delete(
        @Param('id', UserIdPipe) id: string,
    ): Promise<UserResponseDto> {
        const user = await this.command.execute<User>(
            new DeleteUserCommand({ id }),
        );
        return new UserResponseDto(user);
    }

    @Put('update/roles/:id')
    @Permissions(PERMISSIONS.UPDATE_USER_ROLES.name)
    @UseGuards(JwtAuthGuard, AccessGuard)
    async update_roles(
        @Param('id', UserIdPipe) id: string,
        @Body() dto: UpdateUserRolesRequestDto,
    ): Promise<void> {
        await this.command.execute<User>(
            new UpdateUserRolesCommand({
                id: id,
                data: {
                   roles: dto.roles
                },
            }),
        );
    }

    
}


