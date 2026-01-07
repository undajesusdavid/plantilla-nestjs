import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';

// Import DTO
import { CreateUserDtoRequest, CreateUserDtoResponse } from './dto/CreateUserDto';
import { UpdateUserDtoRequest, UpdateUserDtoResponse } from './dto/UpdateUserDto';
import { GetUserDtoResponse } from './dto/GetUserDto';
import { AuthUserDtoRequest, AuthUserDtoResponse } from './dto/AuthUserDto';
//Import Errors
import { ErrorUseCase } from '../../../shared/app/errors/ErrorUseCase';
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
// Import Guards
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AccessGuard } from 'src/access_control/structure/controllers/guards/access.guard';
// Import Pipes
import { UserIdPipe } from './pipes/UserIdPipe';
// Custom decorators
import { Permissions } from 'src/access_control/structure/controllers/decorators/permissions.decorator';
// Import Permissions
import { PERMISSIONS } from 'src/access_control/core/rules/Permission.seeds';
// import uses case
import { type CreateUser, CreateUserToken } from '../../app/user-create/CreateUser';
import { type GetUsers, GetUsersToken } from '../../app/get-users/GetUsers';
import { type AuthUser, AuthUserToken } from '../../app/user-auth/AuthUser';
import { type UpdateUser, UpdateUserToken } from '../../app/user-update/UpdateUser';
import { type DeleteUser, DeleteUserToken } from 'src/users/app/user-delete/DeleteUser';


@Controller('users')
export class UserController {

    constructor(
        @Inject(CreateUserToken) private readonly createUser: CreateUser,
        @Inject(UpdateUserToken) private readonly updateUser: UpdateUser,
        @Inject(GetUsersToken) private readonly getUsers: GetUsers,
        @Inject(DeleteUserToken) private readonly deleteUser: DeleteUser,
        @Inject(AuthUserToken) private readonly authUser: AuthUser,
    ) { }

    @Post("/create")
    @Permissions(PERMISSIONS.CREATE_USER.name)
    @UseGuards(JwtAuthGuard, AccessGuard)
    async register(@Body() dto: CreateUserDtoRequest): Promise<CreateUserDtoResponse> { 
        try {
            const user = await this.createUser.create(dto);
            return new CreateUserDtoResponse(user);
        } catch (error) {
            if (error instanceof ErrorUseCase) {
                throw new InternalServerErrorException(error.message, error.code);
            }
            throw new BadRequestException(error.message);
        }
    }

    @Put("/update")
    @Permissions(PERMISSIONS.UPDATE_USER.name)
    @UseGuards(JwtAuthGuard, AccessGuard)
    async update(@Body() dto: UpdateUserDtoRequest): Promise<UpdateUserDtoResponse> {
        try {
            console.log('DTO recibido en el controlador:', dto);
            const user = await this.updateUser.update(dto);
            return new UpdateUserDtoResponse(user);
        } catch (error) {
            if (error instanceof ErrorUseCase) {
                throw new InternalServerErrorException(error.message, error.code);
            }
            throw new BadRequestException(error.message);
        }
    }

   
    @Get()
    @Permissions(PERMISSIONS.READ_USERS.name)
    @UseGuards(JwtAuthGuard, AccessGuard)
    async getAll(): Promise<GetUserDtoResponse[]> {
        try {
            const users = await this.getUsers.getAll();
            return users.map(user => new GetUserDtoResponse(user));
        } catch (error) {
            if (error instanceof ErrorUseCase) {
                throw new InternalServerErrorException(error.message, error.code);
            }
            
            throw new BadRequestException(error.message);
        }
    }

    @Get(":id")
    @Permissions(PERMISSIONS.READ_USERS.name)
    @UseGuards(JwtAuthGuard, AccessGuard)
    async getOne(@Param('id',UserIdPipe) id: string): Promise<GetUserDtoResponse> {
        try {
            const user = await this.getUsers.getOne(id);
            return new GetUserDtoResponse(user);
        } catch (error) {
            if (error instanceof ErrorUseCase) {
                throw new InternalServerErrorException(error.message, error.code);
            }
            throw new BadRequestException(error.message);
        }
    }
    
    
    @Delete(":id")
    @Permissions(PERMISSIONS.DELETE_USER.name)
    @UseGuards(JwtAuthGuard, AccessGuard)
    async delete(@Param('id', UserIdPipe) id: string): Promise<GetUserDtoResponse> {
        try {
            const user = await this.deleteUser.delete(id);
            return new GetUserDtoResponse(user);
        } catch (error) {
            if (error instanceof ErrorUseCase) {
                throw new InternalServerErrorException(error.message, error.code);
            }
            throw new BadRequestException(error.message);
        }
    }

   
    @Post("/login")
    async login(@Body() dto: AuthUserDtoRequest): Promise<AuthUserDtoResponse> {
        try {
            const authUser = await this.authUser.login(dto);
            return new AuthUserDtoResponse(authUser);
        } catch (error) {
            if (error instanceof ErrorUseCase) {
                throw new InternalServerErrorException(error.message, error.code);
            }
            throw new BadRequestException(error.message);
        }
    }
}
