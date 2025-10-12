import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';

// Import DTO
import { DtoCreateUserRequest } from '../app/user-create/DtoCreateUserRequest';
import { DtoCreateUserResponse } from '../app/user-create/DtoCreateUserResponse';
import { DtoGetUsersResponse } from '../app/get-users/DtoGetUsersResponse';
import { DtoUserIdRequest } from '../app/get-users/DtoUserIdRequest';
import { DtoPayloadResponse } from '../app/user-auth/DtoPayloadResponse';
import { DtoCredentialsRequest } from '../app/user-auth/DtoCredentialsRequest';
//Import Errors
import { ErrorUseCase } from '../app/errors/ErrorUseCase';
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
// Import Guards
import { JwtAuthGuard } from './guards/jwt-auth.guard';

// import uses case
import { type CreateUser, CreateUserToken } from '../app/user-create/CreateUser';
import { type GetUsers, GetUsersToken } from '../app/get-users/GetUsers';
import { type AuthUser, AuthUserToken } from '../app/user-auth/AuthUser';

@Controller('users')
export class UserController {

    constructor(
        @Inject(CreateUserToken) private readonly createUser: CreateUser,
        @Inject(GetUsersToken) private readonly getUsers: GetUsers,
        @Inject(AuthUserToken) private readonly authUser: AuthUser
    ) { }

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
