import { User } from "src/users/core/User";

export interface UserRepository {

    create(user: User): Promise<boolean>;
    update(id:string, user: User): Promise<boolean>
    getAll(): Promise<User[]>
    getOneById(id: string): Promise<User>
    getOneByUsername(username: string): Promise<User | null>
    delete(id: string) : Promise<boolean>
    usernameExists(username: string): Promise<boolean>;
    emailExists(email: string): Promise<boolean>;
}