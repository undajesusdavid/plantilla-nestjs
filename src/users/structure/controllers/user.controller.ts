import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';

// Import DTO
import { DtoCreateUserRequest } from '../../app/user-create/DtoCreateUserRequest';
import { DtoCreateUserResponse } from '../../app/user-create/DtoCreateUserResponse';
import { DtoUpdateUserReponse } from '../../app/user-update/DtoUpdateUserResponse';
import { DtoUpdateUserRequest } from '../../app/user-update/DtoUpdateUserRequest';
import { DtoGetUsersResponse } from '../../app/get-users/DtoGetUsersResponse';
import { DtoUserIdRequest } from '../../app/get-users/DtoUserIdRequest';
import { DtoPayloadResponse } from '../../app/user-auth/DtoPayloadResponse';
import { DtoCredentialsRequest } from '../../app/user-auth/DtoCredentialsRequest';
//Import Errors
import { ErrorUseCase } from '../../../shared/app/errors/ErrorUseCase';
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
// Import Guards
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

// import uses case
import { type CreateUser, CreateUserToken } from '../../app/user-create/CreateUser';
import { type GetUsers, GetUsersToken } from '../../app/get-users/GetUsers';
import { type AuthUser, AuthUserToken } from '../../app/user-auth/AuthUser';
import { type UpdateUser, UpdateUserToken } from '../../app/user-update/UpdateUser';
import { type DeleteUser, DeleteUserToken } from 'src/users/app/user-delete/DeleteUser';
import { DtoDeleteUserResponse } from 'src/users/app/user-delete/DtoDeleteUserResponse';
import { DtoDeleteUserRequest } from 'src/users/app/user-delete/DtoDeleteUserRequest';



@Controller('users')
export class UserController {

    constructor(
        @Inject(CreateUserToken) private readonly createUser: CreateUser,
        @Inject(UpdateUserToken) private readonly updateUser: UpdateUser,
        @Inject(GetUsersToken) private readonly getUsers: GetUsers,
        @Inject(DeleteUserToken) private readonly deleteUser: DeleteUser,
        @Inject(AuthUserToken) private readonly authUser: AuthUser,
    ) { }


    @UseGuards(JwtAuthGuard)
    @Post("/create")
    async register(@Body() body: any): Promise<DtoCreateUserResponse> {
        const dto = new DtoCreateUserRequest(
            body.username,
            body.password,
            body.email,
            body.active
        );

        const errors = dto.validate();
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }

        try {
            return await this.createUser.create(dto);
        } catch (error) {
            if (error instanceof ErrorUseCase) {
                throw new InternalServerErrorException(error.message, error.code);
            }
            throw new BadRequestException(error.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put("/update")
    async update(@Body() data: any): Promise<DtoUpdateUserReponse> {
        try {
            const dto = DtoUpdateUserRequest.create(data);
            return await this.updateUser.update(dto);
        } catch (error) {
            if (error instanceof ErrorUseCase) {
                throw new InternalServerErrorException(error.message, error.code);
            }
            throw new BadRequestException(error.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<DtoGetUsersResponse[]> {
        try {
            const dtoGetUsersResponse = await this.getUsers.getAll();
            return dtoGetUsersResponse;
        } catch (error) {
            if (error instanceof ErrorUseCase) {
                throw new InternalServerErrorException(error.message, error.code);
            }
            throw new BadRequestException(error.message);
        }

    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async delete(@Param('id') id:string ): Promise<DtoDeleteUserResponse> {
        try {
            const dtoRequest = DtoDeleteUserRequest.create({id});
            return await this.deleteUser.delete(dtoRequest);
        } catch (error) {
            if (error instanceof ErrorUseCase) {
                throw new InternalServerErrorException(error.message, error.code);
            }
            throw new BadRequestException(error.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getOne(@Param('id') id: string): Promise<DtoGetUsersResponse> {
        try {
            const dtoRequest = new DtoUserIdRequest(id);
            dtoRequest.validate();
            return await this.getUsers.getOne(dtoRequest);
        } catch (error) {
            if (error instanceof ErrorUseCase) {
                throw new InternalServerErrorException(error.message, error.code);
            }
            throw new BadRequestException(error.message);
        }
    }


    @Post("/login")
    async login(@Body() body: any): Promise<DtoPayloadResponse> {
        try {
            const dtoRequest = new DtoCredentialsRequest(body.username, body.password);
            dtoRequest.validate();
            return await this.authUser.login(dtoRequest);
        } catch (error) {
            if (error instanceof ErrorUseCase) {
                throw new InternalServerErrorException(error.message, error.code);
            }
            throw new BadRequestException(error.message);
        }
    }
}
