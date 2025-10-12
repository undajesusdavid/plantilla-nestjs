import { User } from "src/users/core/User";

export class DtoCreateUserResponse {
    readonly username: string;
    readonly email: string;
    readonly permissions: string[];
    readonly roles: string[];
    constructor(user: User) { 
        this.username = user.getUsername();
        this.email = user.getEmail();
    }
}