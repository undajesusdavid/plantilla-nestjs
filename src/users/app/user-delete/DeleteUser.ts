import { DtoDeleteUserRequest } from "./DtoDeleteUserRequest"
import { DtoDeleteUserResponse } from "./DtoDeleteUserResponse"

export interface DeleteUser {
    delete(dtoDelete : DtoDeleteUserRequest ): Promise<DtoDeleteUserResponse> 
}

export const DeleteUserToken = Symbol('DeleteUser')