import { DtoUpdateUserRequest } from "./DtoUpdateUserRequest";
import { DtoUpdateUserReponse } from "./DtoUpdateUserResponse";

export interface UpdateUser {
    update(dtoRequest : DtoUpdateUserRequest): Promise<DtoUpdateUserReponse>
}

export const UpdateUserToken = Symbol("UpdateUser");