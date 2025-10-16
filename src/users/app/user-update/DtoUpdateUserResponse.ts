import { User } from "src/users/core/User";

export class DtoUpdateUserReponse {
    private readonly id: string;
    private readonly username: string;
    private readonly email: string;
    private readonly active: boolean;

    constructor(user: User) { 
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.active = user.isActive();
    }
}