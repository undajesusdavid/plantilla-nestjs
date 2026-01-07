import { User } from "src/users/core/entities/User";

export interface GetUsers {
    getAll(): Promise<User[]>;
    getOne(id: string): Promise<User>;
}

export const GetUsersToken = Symbol("GetUsers");