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

// Import DTO
import {
    CreateUserRequestDto,
    CreateUserDtoResponse,
} from '@src/modules/users/infrastructure/nestjs/controllers/dto/request/create-user-request.dto';
import {
    UpdateUserRequestDto,
    UpdateUserDtoResponse,
} from '@src/modules/users/infrastructure/nestjs/controllers/dto/request/update-user-request.dto';
import { GetUserDtoResponse } from '@src/modules/users/infrastructure/nestjs/controllers/dto/request/get-user-request.dto';
import {
    AuthUserRequestDto,
    AuthUserDtoResponse,
} from '@src/modules/users/infrastructure/nestjs/controllers/dto/request/auth-user-request.dto';

// Import Guards
import { JwtAuthGuard } from '@shared/infrastructure/framework/nest/controller/guards/jwt-auth.guard';
import { AccessGuard } from '@shared/infrastructure/framework/nest/controller/guards/access.guard';
// Import Pipes
import { UserIdPipe } from '@src/modules/users/infrastructure/nestjs/controllers/pipes/user-id.pipe';
// Custom decorators
import { Permissions } from '@src/shared/infrastructure/framework/nest/controller/decorators/permissions.decorator';
import { type TokenPayload, CurrentUser } from '@src/shared/infrastructure/framework/nest/controller/decorators/current-user.decorator';
// Import Permissions
import { PERMISSIONS } from '@modules/permissions/core/seeds/Permission.seeds';
// import uses case

// Import CommandBus and QueryBus
import { COMMAND_BUS, type CommandBus } from '@src/shared/app/bus/command-bus';
import { QUERY_BUS, type QueryBus } from '@src/shared/app/bus/query-bus';
import { GetUserQuery } from '@modules/users/app/get-user/get-user.query';
import { User } from '@modules/users/core/entities/User';
import { GetUsersQuery } from '@modules/users/app/get-users/get-users.query';
import { AuthUserCommand } from '@modules/users/app/auth-user/auth-user.command';
import { AuthUserResponse } from '@modules/users/app/auth-user/auth-user.response';
import { CreateUserCommand } from '@modules/users/app/create-user/create-user.command';
import { DeleteUserCommand } from '@modules/users/app/delete-user/delete-user.command';
import { UpdateUserCommand } from '@modules/users/app/update-user/update-user.command';
import { GetMyPermissionsQuery } from '@modules/users/app/get-my-permissions/get-my-permissions.query';
import { MyPermissionsResponse } from '@modules/users/app/get-my-permissions/get-my-permissions.use-case';
import { UpdateUserRolesRequestDto } from './dto/request/update-user-roles-request.dto';
import { UpdateUserRolesCommand } from '@src/modules/users/app/update-user-roles/update-user-roles.command';

import { 
    UserResponseDto, 
    AuthResponseDto 
} from './dto';

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
    async getMyPermissions( @CurrentUser() user: TokenPayload): Promise<MyPermissionsResponse> {
        return await this.query.execute<MyPermissionsResponse>(
            new GetMyPermissionsQuery(user.id),
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


