import { DtoCreateUserRequest } from "./DtoCreateUserRequest";
import { DtoCreateUserResponse } from "./DtoCreateUserResponse";

export interface CreateUser {
    create(props: DtoCreateUserRequest): Promise<DtoCreateUserResponse>;
}

export const CreateUserToken = Symbol("CreateUser");