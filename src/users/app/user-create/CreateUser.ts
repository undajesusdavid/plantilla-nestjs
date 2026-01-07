import { CreateUserProps } from "./CreateUserProps";
import { User } from "src/users/core/entities/User";

export interface CreateUser {
    create(props: CreateUserProps): Promise<User>;
}

export const CreateUserToken = Symbol("CreateUser");