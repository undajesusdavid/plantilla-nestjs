import { DtoGetUsersResponse } from "./DtoGetUsersResponse";
import { DtoUserIdRequest } from "./DtoUserIdRequest";

export interface GetUsers {
    getAll(): Promise<DtoGetUsersResponse[]>;
    getOne(id: DtoUserIdRequest): Promise<DtoGetUsersResponse>;
    //getSome(ids: string[]): Promise<DtoGetUsersResponse[]>;
}

export const GetUsersToken = Symbol("GetUsers");