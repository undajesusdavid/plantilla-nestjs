import { User } from "src/users/core/User";

export class DtoGetUsersResponse {
    readonly id: string;
    readonly username: string;
    readonly email: string;
    readonly active: boolean;
  
    constructor(user: User) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.active = user.isActive();
    }
}