import { UserRepository } from "../../core/contracts/UserRepository";
import { ErrorRepositoryService } from "../errors/ErrorRepositoryService";
import { ErrorUseCase } from "../../../shared/app/errors/ErrorUseCase";
import { GetUsers } from "./GetUsers";
import { User } from "src/users/core/entities/User";

export class GetUsersImp implements GetUsers {

    constructor(private userRepo: UserRepository) { }

    async getAll(): Promise<User[]> {

        try {
            const users = await this.userRepo.getAll();
            return users;
        } catch (error) {
            if (error instanceof ErrorRepositoryService) {
                throw new ErrorUseCase(
                    `Error GetUser-getAll: ${error.message}`,
                    `USE_CASE_FAILED ->  ${error.name}`,
                    { originalError: error, class: this.constructor.name, method: "getAll" }
                );
            }
            throw new Error(error.message);
        }



    }

    async getOne(id: string): Promise<User> {
        try {
            const user = await this.userRepo.getOneById(id);
            if (!user) {
                throw new Error(`No se encontró ningún usuario con el ID: ${id}`);
            }
            return user;
        } catch (error) {
            if (error instanceof ErrorRepositoryService) {
                throw new ErrorUseCase(
                    `Error GetUser-getOne: ${error.message}`,
                    `USE_CASE_FAILED ->  ${error.name}`,
                    { originalError: error, class: this.constructor.name, method: "getOne" }
                );
            }
            throw new Error(error.message);
        }
    }
}