import { User } from "src/users/core/User"

export interface DeleteUser {
    delete(id : string ): Promise<User> 
}

export const DeleteUserToken = Symbol('DeleteUser')