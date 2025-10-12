import { User } from "src/users/core/User";

export interface UserRepository {

    create(user: User): Promise<boolean>;
    getAll(): Promise<User[]>
    getOneById(id: string): Promise<User>
    getOneByUsername(username: string): Promise<User | null>
    usernameExists(username: string): Promise<boolean>;
    emailExists(email: string): Promise<boolean>;
}