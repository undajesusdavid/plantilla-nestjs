import { DtoCredentialsRequest } from "./DtoCredentialsRequest";
import { DtoPayloadResponse } from "./DtoPayloadResponse";

export interface AuthUser {
    login(credentials : DtoCredentialsRequest) : Promise<DtoPayloadResponse>
}

export const AuthUserToken = Symbol("AuthUser");