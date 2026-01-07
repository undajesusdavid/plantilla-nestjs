import { AuthUserPropsInput, AuthUserPropsOutput } from "./AuthUserProps";

export interface AuthUser {
    login(credentials : AuthUserPropsInput) : Promise<AuthUserPropsOutput>;
}

export const AuthUserToken = Symbol("AuthUser");