import { User } from "src/users/core/User";

export class DtoDeleteUserResponse {
    private readonly id : string;
    private readonly username: string;
    private readonly email : string;

    constructor(user : User){
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
    }
}