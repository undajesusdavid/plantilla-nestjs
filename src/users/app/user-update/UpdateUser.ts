import { User } from "src/users/core/User";
import { UpdateUserProps } from "./UpdateUserProps";

export interface UpdateUser {
    update(dtoRequest : UpdateUserProps): Promise<User>
}

export const UpdateUserToken = Symbol("UpdateUser");