import { User } from "src/users/core/entities/User"

export interface DeleteUser {
    delete(id : string ): Promise<User> 
}

export const DeleteUserToken = Symbol('DeleteUser')